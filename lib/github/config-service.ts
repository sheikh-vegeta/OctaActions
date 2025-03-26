"use server"

import { Octokit } from "@octokit/rest"
import { config } from "@probot/octokit-plugin-config"
import yaml from "js-yaml"

// Create an Octokit instance with the config plugin
const ConfigOctokit = Octokit.plugin(config)

// Initialize Octokit with auth token
const octokit = new ConfigOctokit({
  auth: process.env.GITHUB_TOKEN,
})

// Get repository configuration
export async function getRepositoryConfig(owner: string, repo: string, path = ".github/octaactions.yml") {
  try {
    const { config: repoConfig } = await octokit.config.get({
      owner,
      repo,
      path,
      defaults: {
        features: {
          codeReview: true,
          issueManagement: true,
          cicd: false,
        },
        settings: {
          language: "en",
          theme: "light",
        },
      },
    })

    return repoConfig
  } catch (error) {
    console.error("Error fetching repository configuration:", error)
    throw error
  }
}

// Update repository configuration
export async function updateRepositoryConfig(
  owner: string,
  repo: string,
  config: any,
  path = ".github/octaactions.yml",
) {
  try {
    // Get the current file if it exists
    let sha: string | undefined
    try {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
      })

      if (!Array.isArray(data)) {
        sha = data.sha
      }
    } catch (error) {
      // File doesn't exist yet, that's okay
    }

    // Convert config to YAML
    const content = yaml.dump(config)

    // Create or update the file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Update OctaActions configuration",
      content: Buffer.from(content).toString("base64"),
      sha,
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating repository configuration:", error)
    throw error
  }
}

