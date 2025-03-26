"use server"

import { createNodeMiddleware, Probot } from "probot"
import { type NextRequest, NextResponse } from "next/server"

// Create a Probot instance
const probot = new Probot({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  secret: process.env.GITHUB_WEBHOOK_SECRET,
})

// Load the app function
const app = (app: Probot) => {
  // Handle issues being opened
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue! A team member from OctaActions will respond soon.",
    })
    return context.octokit.issues.createComment(issueComment)
  })

  // Handle pull requests being opened
  app.on("pull_request.opened", async (context) => {
    // Add PR badge with JIRA issue if available
    const prTitle = context.payload.pull_request.title
    const issueMatch = prTitle.match(/([A-Z]+-\d+)/)
    const issuePrefix = issueMatch ? issueMatch[1] : null

    if (issuePrefix) {
      // Add a comment with JIRA link
      const prComment = context.issue({
        body: `This PR is linked to JIRA issue: [${issuePrefix}](https://jira.company.com/browse/${issuePrefix})`,
      })
      await context.octokit.issues.createComment(prComment)
    }

    // Run automated checks
    const statusParams = {
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      sha: context.payload.pull_request.head.sha,
      context: "OctaActions CI",
      state: "pending",
      description: "Running automated checks...",
    }

    return context.octokit.repos.createCommitStatus(statusParams)
  })

  // Handle repository settings sync
  app.on("push", async (context) => {
    // Check if the push is to the default branch and includes changes to .github/settings.yml
    const { payload } = context
    const defaultBranch = payload.repository.default_branch
    const ref = payload.ref

    if (ref !== `refs/heads/${defaultBranch}`) {
      return
    }

    const files = await context.octokit.repos.getContent({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      path: ".github/settings.yml",
      ref: defaultBranch,
    })

    if (!files) {
      return
    }

    // Process settings.yml and apply repository settings
    // This is a simplified version - in production, you'd parse the YAML and apply settings
    console.log("Repository settings sync triggered")
  })
}

// Create middleware
const middleware = createNodeMiddleware(app, { probot })

// Export a function to handle webhook requests
export async function handleGitHubWebhook(req: NextRequest) {
  // Convert NextRequest to Node's http.IncomingMessage
  const nodeReq = {
    method: req.method,
    headers: Object.fromEntries(req.headers),
    url: req.url,
    body: await req.json(),
  } as any

  // Create a response object
  const responseData: any = {}
  const nodeRes = {
    setHeader: (name: string, value: string) => {
      responseData.headers = responseData.headers || {}
      responseData.headers[name] = value
    },
    end: (data: string) => {
      responseData.body = data
    },
    statusCode: 200,
  } as any

  // Process the webhook
  await new Promise((resolve) => {
    middleware(nodeReq, nodeRes, resolve)
  })

  // Return NextResponse
  return NextResponse.json(
    { message: "Webhook processed" },
    {
      status: nodeRes.statusCode,
      headers: responseData.headers,
    },
  )
}

