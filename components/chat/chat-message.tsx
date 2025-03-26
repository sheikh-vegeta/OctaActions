"use client"

import { useState } from "react"
import { Copy, Check, Bot, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    timestamp: Date
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)

  const isUser = message.role === "user"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex gap-3 rounded-lg p-3", isUser ? "bg-muted/50" : "bg-background")}>
      <Avatar className="h-8 w-8 rounded-full">
        {isUser ? (
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
          <span className="text-sm font-medium">{isUser ? session?.user?.name || "You" : "OctaActions AI"}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
        {!isUser && (
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={copyToClipboard}>
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

