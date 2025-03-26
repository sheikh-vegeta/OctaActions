"use server"

import { createNodeMiddleware, Probot } from 'probot'
import { type NextRequest, NextResponse } from 'next/server'
import SmeeClient from 'smee-client'

// Create a Probot instance
const probot = new Probot({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_PRIVATE_KEY,
  secret: process.env.GITHUB_WEBHOOK_SECRET
})

// Create webhook proxy
const smee = new SmeeClient({
  source: process.env.GITHUB_WEBHOOK_PROXY_URL || '',
  target: 'http://localhost:3000/api/github/webhook',
  logger: console
})

// Start webhook proxy
smee.start()

// Load the app function
const app = (app: Probot) => {
  // Handle issues being opened
  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({
      body: 'Thanks for opening this issue! A team member from OctaActions will respond soon.'
    })
    return context.octokit.issues.createComment(issueComment)
  })

  // Handle pull requests being opened
  app.on('pull_request.opened', async (context) => {
    // Add PR badge with JIRA issue if available
    const prTitle = context.payload.pull_request.title
    const issueMatch = prTitle.match(/([A-Z]+-\d+)/)
    const issuePrefix = issueMatch ? issueMatch[1] : null

    if (issuePrefix) {
      // Add a comment with JIRA link
      const prComment = context.issue({
        body: `This PR is linked to JIRA issue: [${issuePrefix}](https://jira.company.com/browse/${issuePrefix})`
      })
      await context.octokit.issues.createComment(prComment)
    }

    // Run automated checks
    const statusParams = {
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      sha: context.payload.pull_request.head.sha,
      context: 'OctaActions CI',
      state: 'pending',
      description: 'Running automated checks...'
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
  try {
    const body = await req.text()
    const headers = Object.fromEntries(req.headers.entries())
    const response = await middleware(req, { headers, body })
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error handling GitHub webhook:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
