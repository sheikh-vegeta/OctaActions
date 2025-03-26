"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { GitBranch, GitCommit, GitPullRequest, RefreshCw } from "lucide-react"

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

export function GitHubIntegration() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [branch, setBranch] = useState("main")
  const [commitMessage, setCommitMessage] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchRepositories()
  }, [])

  const fetchRepositories = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/github/repositories")
      const data = await response.json()

      if (data.repositories) {
        setRepositories(data.repositories)
      }
    } catch (error) {
      console.error("Error fetching repositories:", error)
      toast({
        title: "Error",
        description: "Failed to fetch repositories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSelectRepository = (repo: Repository) => {
    setSelectedRepo(repo)
  }

  const handleCreatePullRequest = async () => {
    if (!selectedRepo) return

    try {
      const response = await fetch("/api/github/pull-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: selectedRepo.owner.login,
          repo: selectedRepo.name,
          title: `Update from OctaActions`,
          body: "This pull request was created using OctaActions.",
          head: branch,
          base: "main",
        }),
      })

      const data = await response.json()

      if (data.result) {
        toast({
          title: "Success",
          description: "Pull request created successfully",
        })
      }
    } catch (error) {
      console.error("Error creating pull request:", error)
      toast({
        title: "Error",
        description: "Failed to create pull request",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">GitHub Integration</h1>

      <Tabs defaultValue="repositories">
        <TabsList className="mb-4">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="repositories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Repositories
                  <Button variant="outline" size="icon" onClick={fetchRepositories} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  </Button>
                </CardTitle>
                <CardDescription>Select a repository to work with</CardDescription>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {repositories.length > 0 ? (
                  <ul className="space-y-2">
                    {repositories.map((repo) => (
                      <li key={repo.id}>
                        <Button
                          variant={selectedRepo?.id === repo.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleSelectRepository(repo)}
                        >
                          <GitBranch className="mr-2 h-4 w-4" />
                          {repo.full_name}
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    {loading ? "Loading repositories..." : "No repositories found"}
                  </p>
                )}
              </CardContent>
            </Card>

            {selectedRepo && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedRepo.full_name}</CardTitle>
                  <CardDescription>{selectedRepo.description || "No description"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="main"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commit-message">Commit Message</Label>
                      <Input
                        id="commit-message"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                        placeholder="Update from OctaActions"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="w-[48%]">
                    <GitCommit className="mr-2 h-4 w-4" />
                    Commit Changes
                  </Button>
                  <Button className="w-[48%]" onClick={handleCreatePullRequest}>
                    <GitPullRequest className="mr-2 h-4 w-4" />
                    Create PR
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration Settings</CardTitle>
              <CardDescription>Configure your GitHub integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-token">GitHub Token</Label>
                  <Input id="github-token" type="password" placeholder="GitHub token is stored securely" disabled />
                  <p className="text-sm text-muted-foreground">
                    Your GitHub token is securely stored and used for authentication.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Webhook Integration</Label>
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm font-mono break-all">{`${window.location.origin}/api/github/webhook`}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add this URL as a webhook in your GitHub repository settings.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

