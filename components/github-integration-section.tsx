"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, GitBranch, GitPullRequest, GitMerge, GitCommit } from "lucide-react"

export function GitHubIntegrationSection() {
  return (
    <section id="github-integration" className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            GitHub Integration
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Seamless GitHub Workflow</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Import repositories, manage branches, create pull requests, and more, all from within OctaActions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Complete GitHub Integration</h3>
              <p className="text-muted-foreground">
                OctaActions integrates deeply with GitHub, providing a seamless workflow for developers. Import your
                repositories, manage branches, create pull requests, and more, all from within the platform.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: <GitBranch className="h-5 w-5 text-blue-500" />,
                    title: "Branch Management",
                    description: "Create, switch, and manage branches directly from the editor.",
                  },
                  {
                    icon: <GitCommit className="h-5 w-5 text-blue-500" />,
                    title: "Commit Changes",
                    description: "Stage, commit, and push changes with a simple interface.",
                  },
                  {
                    icon: <GitPullRequest className="h-5 w-5 text-blue-500" />,
                    title: "Pull Requests",
                    description: "Create, review, and merge pull requests without leaving OctaActions.",
                  },
                  {
                    icon: <GitMerge className="h-5 w-5 text-blue-500" />,
                    title: "Conflict Resolution",
                    description: "Resolve merge conflicts with an intuitive visual interface.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button className="gap-2">
                <Github className="h-5 w-5" />
                <span>Connect GitHub Account</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg overflow-hidden border shadow-xl"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3738-GKVdWaYwahZZbeT1c2RDevTDsgKGMF.png"
              width={600}
              height={400}
              alt="GitHub integration"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <div className="rounded-lg border bg-background p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-500">Automated Workflows</div>
              <p className="text-muted-foreground">
                Set up automated workflows triggered by GitHub events like push, pull request, and issue creation.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-500">Code Reviews</div>
              <p className="text-muted-foreground">
                Review code changes, add comments, and approve pull requests directly from OctaActions.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-500">CI/CD Integration</div>
              <p className="text-muted-foreground">
                Integrate with GitHub Actions for continuous integration and deployment pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

