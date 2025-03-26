import { ProbotSettings } from "@/components/github/probot-settings"
import { getRepositoryConfig } from "@/lib/github/config-service"

interface RepositorySettingsPageProps {
  params: {
    owner: string
    repo: string
  }
}

export default async function RepositorySettingsPage({ params }: RepositorySettingsPageProps) {
  const { owner, repo } = params

  // Fetch repository configuration
  let config
  try {
    config = await getRepositoryConfig(owner, repo)
  } catch (error) {
    console.error("Error fetching repository configuration:", error)
    // Use default config if fetch fails
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">
        Repository Settings: {owner}/{repo}
      </h1>

      <ProbotSettings owner={owner} repo={repo} initialConfig={config} />
    </div>
  )
}

