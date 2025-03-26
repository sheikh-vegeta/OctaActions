"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Octokit } from "@octokit/rest"
import { config } from "@probot/octokit-plugin-config"

// Extend Octokit with the config plugin
const OctokitWithConfig = Octokit.plugin(config)

type Repository = {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
  }
  private: boolean
  html_url: string
  description: string | null
  default_branch: string
  created_at: string
  updated_at: string
}

type Branch = {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

type GitHubContextType = {
  octokit: Octokit | null
  isLoading: boolean
  repositories: Repository[]
  fetchRepositories: () => Promise<Repository[]>
  fetchBranches: (owner: string, repo: string) => Promise<Branch[]>
  createFile: (
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch?: string,
  ) => Promise<void>
  updateFile: (
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    sha: string,
    branch?: string,
  ) => Promise<void>
  getFileContent: (owner: string, repo: string, path: string, ref?: string) => Promise<{ content: string; sha: string }>
  getRepoConfig: (owner: string, repo: string, path: string, defaults?: any) => Promise<any>
}

const GitHubContext = createContext<GitHubContextType>({
  octokit: null,
  isLoading: true,
  repositories: [],
  fetchRepositories: async () => [],
  fetchBranches: async () => [],
  createFile: async () => {},
  updateFile: async () => {},
  getFileContent: async () => ({ content: "", sha: "" }),
  getRepoConfig: async () => ({}),
})

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  const [octokit, setOctokit] = useState<Octokit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    const initOctokit = async () => {
      if (isAuthenticated && user?.githubToken) {
        const octokitInstance = new OctokitWithConfig({
          auth: user.githubToken,
        })
        setOctokit(octokitInstance)
      }
      setIsLoading(false)
    }

    initOctokit()
  }, [isAuthenticated, user])

  const fetchRepositories = async (): Promise<Repository[]> => {
    if (!octokit) return []

    try {
      const response = await octokit.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 100,
      })

      const repos = response.data as Repository[]
      setRepositories(repos)
      return repos
    } catch (error) {
      console.error("Error fetching repositories:", error)
      return []
    }
  }

  const fetchBranches = async (owner: string, repo: string): Promise<Branch[]> => {
    if (!octokit) return []

    try {
      const response = await octokit.repos.listBranches({
        owner,
        repo,
      })

      return response.data as Branch[]
    } catch (error) {
      console.error("Error fetching branches:", error)
      return []
    }
  }

  const createFile = async (
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch?: string,
  ): Promise<void> => {
    if (!octokit) throw new Error("GitHub not authenticated")

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString("base64"),
        branch: branch,
      })
    } catch (error) {
      console.error("Error creating file:", error)
      throw error
    }
  }

  const updateFile = async (
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    sha: string,
    branch?: string,
  ): Promise<void> => {
    if (!octokit) throw new Error("GitHub not authenticated")

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString("base64"),
        sha,
        branch: branch,
      })
    } catch (error) {
      console.error("Error updating file:", error)
      throw error
    }
  }

  const getFileContent = async (
    owner: string,
    repo: string,
    path: string,
    ref?: string,
  ): Promise<{ content: string; sha: string }> => {
    if (!octokit) throw new Error("GitHub not authenticated")

    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref,
      })

      if (Array.isArray(response.data)) {
        throw new Error("Path is a directory, not a file")
      }

      // @ts-ignore - The type definitions don't include the content property
      const content = Buffer.from(response.data.content, "base64").toString()

      return {
        // @ts-ignore
        content,
        // @ts-ignore
        sha: response.data.sha,
      }
    } catch (error) {
      console.error("Error getting file content:", error)
      throw error
    }
  }

  const getRepoConfig = async (owner: string, repo: string, path: string, defaults?: any): Promise<any> => {
    if (!octokit) throw new Error("GitHub not authenticated")

    try {
      // @ts-ignore - The config plugin adds this method
      const { config } = await octokit.config.get({
        owner,
        repo,
        path,
        defaults,
      })

      return config
    } catch (error) {
      console.error("Error getting repo config:", error)
      throw error
    }
  }

  return (
    <GitHubContext.Provider
      value={{
        octokit,
        isLoading,
        repositories,
        fetchRepositories,
        fetchBranches,
        createFile,
        updateFile,
        getFileContent,
        getRepoConfig,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export const useGitHub = () => useContext(GitHubContext)

