"use server"

import { Octokit } from "@octokit/rest"

// Initialize Octokit with auth token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

// Get user repositories
export async function getUserRepositories() {
  try {
    const { data } = await octokit.repos.listForAuthenticatedUser({
      sort: "updated",
      per_page: 100,
    })

    return data
  } catch (error) {
    console.error("Error fetching user repositories:", error)
    throw error
  }
}

// Get repository contents
export async function getRepositoryContents(owner: string, repo: string, path = "") {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    })

    return data
  } catch (error) {
    console.error("Error fetching repository contents:", error)
    throw error
  }
}

// Create or update file
export async function createOrUpdateFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message = "Update from OctaActions",
  branch = "main",
) {
  try {
    // Check if file exists
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      })

      if (!Array.isArray(data)) {
        sha = data.sha
      }
    } catch (error) {
      // File doesn't exist yet, that's okay
    }

    // Create or update the file
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString("base64"),
      sha,
      branch,
    })

    return data
  } catch (error) {
    console.error("Error creating or updating file:", error)
    throw error
  }
}

// Create a pull request
export async function createPullRequest(
  owner: string,
  repo: string,
  title: string,
  body: string,
  head: string,
  base = "main",
) {
  try {
    const { data } = await octokit.pulls.create({
      owner,
      repo,
      title,
      body,
      head,
      base,
    })

    return data
  } catch (error) {
    console.error("Error creating pull request:", error)
    throw error
  }
}

