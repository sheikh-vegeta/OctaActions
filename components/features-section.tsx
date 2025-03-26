"use client"

import { motion } from "framer-motion"
import { Code, GitBranch, Zap, Shield, Globe, Terminal, Cpu, Database, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Browser-Based Development",
      description:
        "Code from anywhere without local setup. Access your development environment from any device with a browser.",
      icon: <Globe className="size-5" />,
    },
    {
      title: "GitHub Integration",
      description:
        "Seamlessly connect to your GitHub repositories. Clone, commit, push, and manage pull requests directly from the browser.",
      icon: <GitBranch className="size-5" />,
    },
    {
      title: "Real-Time Debugging",
      description:
        "Debug your code in real-time with immediate feedback. Set breakpoints, inspect variables, and fix issues faster.",
      icon: <Code className="size-5" />,
    },
    {
      title: "Multiple Tech Stacks",
      description:
        "Support for various frameworks and languages. Build with React, Vue, Angular, Node.js, Python, and more.",
      icon: <Terminal className="size-5" />,
    },
    {
      title: "One-Click Deployment",
      description:
        "Deploy your applications with a single click to various platforms including Vercel, Netlify, and more.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Secure Authentication",
      description:
        "Integrated Auth0 authentication for secure access control. Protect your code and manage team permissions.",
      icon: <Lock className="size-5" />,
    },
    {
      title: "Database Connectivity",
      description:
        "Connect to your databases directly from the browser. Manage and query your data without switching tools.",
      icon: <Database className="size-5" />,
    },
    {
      title: "AI-Powered Assistance",
      description: "Get intelligent code suggestions and automated bug fixes powered by advanced AI models.",
      icon: <Cpu className="size-5" />,
    },
    {
      title: "Enterprise Security",
      description: "End-to-end encryption and compliance features to keep your code and data secure at all times.",
      icon: <Shield className="size-5" />,
    },
  ]

  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need to Build</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Our comprehensive platform provides all the tools you need to develop, test, and deploy your applications
            without ever leaving your browser.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

