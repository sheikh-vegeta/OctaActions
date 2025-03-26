"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Send, Paperclip, Bot, User, Code, FileCode, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  files?: { name: string; url: string; type: string }[]
}

export function AgentChat() {
  const { data: session } = useSession()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "preview">("chat")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm your AI agent. Describe the app you want to build, or upload a screenshot, and I'll create it for you.",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() && !selectedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      files: selectedFile
        ? [
            {
              name: selectedFile.name,
              url: URL.createObjectURL(selectedFile),
              type: selectedFile.type,
            },
          ]
        : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setSelectedFile(null)
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // which would then call the Groq API
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I'll create a web application based on your description. Here's a sample React component:\n\n```jsx\nimport React from 'react';\nimport { Button } from '@/components/ui/button';\n\nexport default function App() {\n  return (\n    <div className=\"container mx-auto p-4\">\n      <h1 className=\"text-2xl font-bold mb-4\">Hello, OctaActions!</h1>\n      <Button>Click me</Button>\n    </div>\n  );\n}\n```\n\nYou can find the complete code in the Code tab.",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
        setActiveTab("code")
      }, 2000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col rounded-lg border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/okta-logo.svg" alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-medium">OctaActions AI Agent</h2>
            <p className="text-xs text-muted-foreground">Powered by Groq</p>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "code" | "preview")}>
          <TabsList>
            <TabsTrigger value="chat" className="gap-1">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline-block">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-1">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline-block">Code</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1">
              <FileCode className="h-4 w-4" />
              <span className="hidden sm:inline-block">Preview</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3 rounded-lg p-3", message.role === "user" ? "bg-muted/50" : "bg-background")}
              >
                <Avatar className="h-8 w-8 rounded-full">
                  {message.role === "user" ? (
                    <>
                      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/okta-logo.svg" alt="AI" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {message.role === "user" ? session?.user?.name || "You" : "OctaActions AI"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {message.files && message.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {message.files.map((file, index) => (
                        <div key={index} className="rounded-md border bg-muted/50 p-2 flex items-center gap-2">
                          <div className="size-10 rounded-md bg-background overflow-hidden">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FileCode className="h-6 w-6 m-2 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                <Bot className="h-5 w-5 animate-pulse text-muted-foreground" />
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative">
              <Textarea
                placeholder="Describe the app you want to build..."
                className="min-h-24 resize-none pr-12"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <div className="absolute bottom-1 right-1 flex items-center gap-1">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={handleFileUpload}
                  disabled={isLoading}
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className={cn("h-8 w-8 rounded-full", isLoading && "opacity-50")}
                  disabled={isLoading || (!input.trim() && !selectedFile)}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                <div className="size-8 rounded-md bg-background overflow-hidden">
                  {selectedFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                      alt={selectedFile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileCode className="h-5 w-5 m-1.5 text-muted-foreground" />
                  )}
                </div>
                <span className="text-xs truncate flex-1">{selectedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setSelectedFile(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              AI responses are generated using Groq. Your conversations may be used to improve the service.
            </p>
          </form>
        </div>
      </TabsContent>

      <TabsContent value="code" className="flex-1 flex flex-col p-0 m-0">
        <div className="flex-1 overflow-auto">
          <div className="border-b p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">App.jsx</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
          <pre className="p-4 text-sm overflow-auto">
            <code className="language-jsx">
              {`import React from 'react';
import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello, OctaActions!</h1>
      <Button>Click me</Button>
    </div>
  );
}`}
            </code>
          </pre>
        </div>
      </TabsContent>

      <TabsContent value="preview" className="flex-1 flex flex-col p-0 m-0">
        <div className="flex-1 overflow-auto p-4">
          <div className="rounded-lg border bg-background p-4 h-full flex flex-col items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold">Hello, OctaActions!</h1>
              <Button>Click me</Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </div>
  )
}

