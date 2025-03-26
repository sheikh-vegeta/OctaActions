"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Terminal, Database, Lock, Package, Github, Cloud, Settings, Layers, Cpu } from "lucide-react"

export function CloudDevSection() {
  return (
    <section id="cloud-dev" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Cloud Development
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Build and Ship, All in One Place</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Customize your development environment, leverage powerful tools, and scale your workspace resources to
            handle projects of all sizes.
          </p>
        </motion.div>

        <Tabs defaultValue="editor" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="mt-0">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Powerful Code Editor</h3>
                    <p className="text-muted-foreground">
                      A fully-featured code editor that works in your browser and on your mobile device.
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {[
                      {
                        icon: <Settings className="h-5 w-5 text-blue-500" />,
                        title: "Customizable Interface",
                        description: "Configure tabs, panes, and key bindings to your liking.",
                      },
                      {
                        icon: <Code className="h-5 w-5 text-blue-500" />,
                        title: "Syntax Highlighting",
                        description: "Support for all major programming languages and frameworks.",
                      },
                      {
                        icon: <Terminal className="h-5 w-5 text-blue-500" />,
                        title: "Integrated Terminal",
                        description: "Run commands directly from your editor.",
                      },
                      {
                        icon: <Layers className="h-5 w-5 text-blue-500" />,
                        title: "Extensions Support",
                        description: "Enhance your editor with powerful extensions.",
                      },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg overflow-hidden border shadow-xl bg-background"
              >
                <div className="border-b p-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-center flex-1">app.tsx</div>
                </div>
                <div className="p-4 text-sm font-mono overflow-x-auto">
                  <pre className="text-xs md:text-sm">
                    <code className="language-tsx">
                      <span className="text-blue-500">import</span> <span className="text-purple-500">React</span>{" "}
                      <span className="text-blue-500">from</span> <span className="text-green-500">'react'</span>;{"\n"}
                      <span className="text-blue-500">import</span> {"{"}{" "}
                      <span className="text-purple-500">Button</span> {"}"} <span className="text-blue-500">from</span>{" "}
                      <span className="text-green-500">'@/components/ui/button'</span>;{"\n\n"}
                      <span className="text-blue-500">export default function</span>{" "}
                      <span className="text-yellow-500">App</span>() {"{"}
                      {"\n"}
                      {"  "}
                      <span className="text-blue-500">return</span> ({"\n"}
                      {"    "}&lt;<span className="text-purple-500">div</span>{" "}
                      <span className="text-yellow-500">className</span>=
                      <span className="text-green-500">"container mx-auto p-4"</span>&gt;{"\n"}
                      {"      "}&lt;<span className="text-purple-500">h1</span>{" "}
                      <span className="text-yellow-500">className</span>=
                      <span className="text-green-500">"text-2xl font-bold mb-4"</span>&gt;{"\n"}
                      {"        "}Hello, OctaActions!{"\n"}
                      {"      "}&lt;/<span className="text-purple-500">h1</span>&gt;{"\n"}
                      {"      "}&lt;<span className="text-purple-500">Button</span>&gt;Click me&lt;/
                      <span className="text-purple-500">Button</span>&gt;{"\n"}
                      {"    "}&lt;/<span className="text-purple-500">div</span>&gt;{"\n"}
                      {"  "});{"\n"}
                      {"}"}
                      {"\n"}
                    </code>
                  </pre>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          <TabsContent value="tools" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Github className="h-6 w-6 text-blue-500" />,
                  title: "GitHub Import",
                  description: "Import repositories directly from GitHub and start coding immediately.",
                },
                {
                  icon: <Cloud className="h-6 w-6 text-blue-500" />,
                  title: "Object Storage",
                  description: "Store and retrieve files, images, and other assets with ease.",
                },
                {
                  icon: <Lock className="h-6 w-6 text-blue-500" />,
                  title: "Secrets Manager",
                  description: "Securely store and manage API keys, tokens, and other sensitive information.",
                },
                {
                  icon: <Package className="h-6 w-6 text-blue-500" />,
                  title: "Package Manager",
                  description: "Install and manage dependencies for any programming language.",
                },
                {
                  icon: <Database className="h-6 w-6 text-blue-500" />,
                  title: "Database Integration",
                  description: "Connect to and manage databases directly from your workspace.",
                },
                {
                  icon: <Cpu className="h-6 w-6 text-blue-500" />,
                  title: "Compute Resources",
                  description: "Scale your workspace resources to handle projects of all sizes.",
                },
              ].map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="rounded-lg border p-6 bg-background"
                >
                  <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="infrastructure" className="mt-0">
            <div className="rounded-lg border p-6 bg-background">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Scalable Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Our cloud infrastructure is designed to scale with your needs, from small personal projects to large
                    enterprise applications.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Automatic scaling based on resource usage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Global CDN for fast content delivery</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Containerized environments for consistency</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Automated backups and disaster recovery</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-500">99.9%</div>
                      <div className="text-muted-foreground">Uptime Guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

