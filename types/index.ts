export interface User {
  id: string
  name?: string
  email?: string
  image?: string
}

export interface Project {
  id: string
  name: string
  description?: string
  userId: string
  repoUrl?: string
  createdAt: Date
  updatedAt: Date
  files: ProjectFile[]
}

export interface ProjectFile {
  id: string
  name: string
  path: string
  content: string
  projectId: string
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  projectId?: string
  createdAt: Date
}

export interface AICompletion {
  text: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  private: boolean
  owner: {
    login: string
    avatar_url: string
  }
}

