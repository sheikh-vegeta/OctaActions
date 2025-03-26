"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Upload, Sparkles, Code, Zap, Braces, Bot, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function AIAgentSection() {
  const [activeTab, setActiveTab] = useState("prompt")

  return (
    <section id="ai-agent" className="w-full py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            AI Agent
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Build Apps with Natural Language</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Describe your app idea or upload a screenshot, and our AI agent will build it for you automatically. It's
            like having an entire team of software engineers on demand.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="prompt" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="prompt">Text Prompt</TabsTrigger>
                <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
              </TabsList>
              <TabsContent value="prompt" className="space-y-4">
                <div className="relative rounded-lg border bg-background p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Describe your app</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Create a task management app with a clean interface. It should have a dashboard showing task
                      statistics, a list of tasks grouped by status, and the ability to add, edit, and delete tasks.
                      Each task should have a title, description, due date, priority level, and status.
                    </p>
                    <div className="flex justify-end">
                      <Button size="sm" className="gap-1">
                        <Sparkles className="h-4 w-4" />
                        Generate App
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-lg border bg-background p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">AI is generating your app</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Planning
                        </Badge>
                        <span className="text-sm text-muted-foreground">Designing app structure and components</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Coding
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Generating React components and API routes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          Testing
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Validating functionality and responsiveness
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          Optimizing
                        </Badge>
                        <span className="text-sm text-muted-foreground">Refining code and improving performance</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="screenshot" className="space-y-4">
                <div className="rounded-lg border border-dashed bg-background p-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Upload a Screenshot</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Drag and drop a screenshot of any app or website, and our AI will recreate it with code.
                    </p>
                    <Button className="mt-4 gap-2">
                      <Upload className="h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-muted-foreground">Recent examples:</span>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded bg-muted"></div>
                    <div className="h-8 w-8 rounded bg-muted"></div>
                    <div className="h-8 w-8 rounded bg-muted"></div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden border shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3741-NFi9muHME0z3ABsCJvbjtFZZ6yXEjR.webp"
                width={600}
                height={400}
                alt="AI-generated app preview"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
          </motion.div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Business Software",
              icon: <Braces className="h-5 w-5" />,
              description: "CRMs, dashboards, analytics tools, and more.",
            },
            {
              title: "AI Chatbots",
              icon: <Bot className="h-5 w-5" />,
              description: "Custom AI assistants for various use cases.",
            },
            {
              title: "Web Applications",
              icon: <Code className="h-5 w-5" />,
              description: "Full-stack web apps with database integration.",
            },
            {
              title: "Mobile Apps",
              icon: <Smartphone className="h-5 w-5" />,
              description: "Responsive designs that work on all devices.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

