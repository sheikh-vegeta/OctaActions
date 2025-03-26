"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Send, Sparkles, Paperclip, Mic, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chat/chat-message"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const { data: session } = useSession()
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your AI assistant powered by Groq. How can I help you with your development tasks today?",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to your backend
      // which would then call the Groq API
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "This is a simulated response. In a real implementation, this would be a response from the Groq API using the GROQ_API_KEY environment variable.",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1000)
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
            <h2 className="text-sm font-medium">OctaActions AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Powered by Groq</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>New Chat</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
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
              placeholder="Ask me anything about coding, debugging, or deployment..."
              className="min-h-24 resize-none pr-12"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <div className="absolute bottom-1 right-1 flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full" disabled={isLoading}>
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full" disabled={isLoading}>
                <Mic className="h-4 w-4" />
                <span className="sr-only">Voice input</span>
              </Button>
              <Button
                type="submit"
                size="icon"
                className={cn("h-8 w-8 rounded-full", isLoading && "opacity-50")}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            AI responses are generated using Groq. Your conversations may be used to improve the service.
          </p>
        </form>
      </div>
    </div>
  )
}

