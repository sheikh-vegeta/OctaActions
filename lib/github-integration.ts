/**
 * GitHub integration service for component code submission and PR creation
 */

import { Octokit } from '@octokit/rest';
import { Base64 } from 'js-base64';

interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
  baseBranch?: string;
}

interface CreateComponentParams {
  componentName: string;
  componentCode: string;
  description: string;
  demoCode?: string;
}

export class GitHubService {
  private octokit: Octokit;
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = {
      baseBranch: 'main',
      ...config,
    };
    
    this.octokit = new Octokit({
      auth: config.token,
    });
  }

  /**
   * Get the SHA of the latest commit on the base branch
   */
  async getLatestCommitSha(): Promise<string> {
    const { data: refData } = await this.octokit.git.getRef({
      owner: this.config.owner,
      repo: this.config.repo,
      ref: `heads/${this.config.baseBranch}`,
    });

    return refData.object.sha;
  }

  /**
   * Create a new branch for the component
   */
  async createBranch(branchName: string): Promise<void> {
    const latestCommitSha = await this.getLatestCommitSha();

    await this.octokit.git.createRef({
      owner: this.config.owner,
      repo: this.config.repo,
      ref: `refs/heads/${branchName}`,
      sha: latestCommitSha,
    });
  }

  /**
   * Create or update a file in the repository
   */
  async createOrUpdateFile(
    path: string,
    content: string,
    message: string,
    branch: string
  ): Promise<void> {
    let fileSha: string | undefined;

    // Try to get the file to see if it exists
    try {
      const { data: fileData } = await this.octokit.repos.getContent({
        owner: this.config.owner,
        repo: this.config.repo,
        path,
        ref: branch,
      });

      if (!Array.isArray(fileData) && fileData.type === 'file') {
        fileSha = fileData.sha;
      }
    } catch (error) {
      // File doesn't exist, which is fine for creation
    }

    // Create or update the file
    await this.octokit.repos.createOrUpdateFileContents({
      owner: this.config.owner,
      repo: this.config.repo,
      path,
      message,
      content: Base64.encode(content),
      branch,
      sha: fileSha,
    });
  }

  /**
   * Create a pull request
   */
  async createPullRequest(
    branch: string,
    title: string,
    body: string
  ): Promise<number> {
    const { data: prData } = await this.octokit.pulls.create({
      owner: this.config.owner,
      repo: this.config.repo,
      title,
      body,
      head: branch,
      base: this.config.baseBranch,
    });

    return prData.number;
  }

  /**
   * Create a new component and submit it as a PR
   */
  async createComponent(params: CreateComponentParams): Promise<number> {
    const { componentName, componentCode, description, demoCode } = params;
    
    // Normalize component name for branch and file names
    const normalizedName = componentName.toLowerCase().replace(/\s+/g, '-');
    const branchName = `component/${normalizedName}`;
    const componentPath = `components/ui/${normalizedName}.tsx`;
    const demoPath = demoCode ? `components/examples/${normalizedName}-demo.tsx` : undefined;
    
    // Create a new branch
    await this.createBranch(branchName);
    
    // Create the component file
    await this.createOrUpdateFile(
      componentPath,
      componentCode,
      `Add ${componentName} component`,
      branchName
    );
    
    // Create the demo file if provided
    if (demoCode && demoPath) {
      await this.createOrUpdateFile(
        demoPath,
        demoCode,
        `Add ${componentName} demo`,
        branchName
      );
    }
    
    // Create a PR
    const prTitle = `Add ${componentName} component`;
    const prBody = `## ${componentName} Component

${description}

### Files Created
- `${componentPath}`: Main component file
${demoPath ? `- `${demoPath}`: Demo component file` : ''}`;
    
    return this.createPullRequest(branchName, prTitle, prBody);
  }
}

/**
 * Create a new GitHub service instance
 */
export function getGitHubService(): GitHubService {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER || 'sheikh-vegeta';
  const repo = process.env.GITHUB_REPO || 'OctaActions';
  
  if (!token) {
    throw new Error('GITHUB_TOKEN is not set in environment variables');
  }
  
  return new GitHubService({
    owner,
    repo,
    token,
  });
}
