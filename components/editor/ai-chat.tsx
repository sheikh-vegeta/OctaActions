"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Send, Bot, User, Paperclip, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAI } from "@/components/ai/ai-provider"

interface AIChatProps {
  onClose: () => void
  language?: "en" | "bn"
  isMobile?: boolean
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIChat({ onClose, language = "en", isMobile = false }: AIChatProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        language === "en"
          ? "Hello! I'm your AI coding assistant. How can I help you today?"
          : "হ্যালো! আমি আপনার AI কোডিং সহকারী। আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি?",
      timestamp: new Date(),
    },
  ])
  const { models, selectedModel, setSelectedModel, isGenerating } = useAI()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      // In a real app, this would use the AI provider
      // For now, we'll just simulate a delay
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateMockResponse(input, selectedModel, language),
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const generateMockResponse = (input: string, model: string, lang: string): string => {
    if (lang === "bn") {
      return `আপনার প্রশ্ন "${input}" এর উত্তরে, ${model} মডেল ব্যবহার করে আমি বলতে চাই:
      
আপনি যে কোড সম্পর্কে জিজ্ঞাসা করেছেন, সেটি একটি JavaScript ফাংশন যা ইনপুট হিসাবে একটি নাম নেয় এবং একটি স্বাগত বার্তা প্রদান করে। আপনি এটি আরও উন্নত করতে পারেন:

\`\`\`javascript
function greet(name, language = 'en') {
  const greetings = {
    en: \`Hello, \${name}!\`,
    bn: \`হ্যালো, \${name}!\`
  };
  
  return greetings[language] || greetings.en;
}

console.log(greet("World", "bn"));
\`\`\`

এই কোডটি বহুভাষিক সমর্থন যোগ করে।`
    }

    return `In response to your question "${input}", using the ${model} model:

The code you're asking about is a JavaScript function that takes a name as input and returns a greeting message. You could enhance it like this:

\`\`\`javascript
function greet(name, language = 'en') {
  const greetings = {
    en: \`Hello, \${name}!\`,
    bn: \`হ্যালো, \${name}!\`
  };
  
  return greetings[language] || greetings.en;
}

console.log(greet("World", "en"));
\`\`\`

This adds multilingual support to your greeting function.`
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-10 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4" />
          <span className="text-sm font-medium">{language === "en" ? "AI Assistant" : "AI সহকারী"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="h-7 w-[180px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!isMobile && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3 rounded-lg p-3", message.role === "user" ? "bg-muted/50" : "bg-background")}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
                  message.role === "user" ? "bg-background" : "bg-primary/10",
                )}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {message.role === "user"
                      ? language === "en"
                        ? "You"
                        : "আপনি"
                      : language === "en"
                        ? "AI Assistant"
                        : "AI সহকারী"}
                  </span>
                  <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                </div>
                <div
                  className={cn(
                    "prose prose-sm dark:prose-invert max-w-none",
                    language === "bn" && message.role === "assistant" ? "font-bangla" : "",
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex gap-3 rounded-lg p-3 bg-background">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary/10">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{language === "en" ? "AI Assistant" : "AI সহকারী"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    {language === "en" ? "Thinking..." : "চিন্তা করছে..."}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative">
            <Textarea
              placeholder={language === "en" ? "Ask something about your code..." : "আপনার কোড সম্পর্কে কিছু জিজ্ঞাসা করুন..."}
              className="min-h-24 resize-none pr-12"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isGenerating}
            />
            <div className="absolute bottom-1 right-1 flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={isGenerating}
              >
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button
                type="submit"
                size="icon"
                className={cn("h-8 w-8 rounded-full", isGenerating && "opacity-50")}
                disabled={isGenerating || !input.trim()}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {language === "en"
              ? `Using ${selectedModel} model. Your conversations may be used to improve the service.`
              : `${selectedModel} মডেল ব্যবহার করছে। আপনার কথোপকথন পরিষেবা উন্নত করতে ব্যবহার করা হতে পারে।`}
          </p>
        </form>
      </div>
    </div>
  )
}

