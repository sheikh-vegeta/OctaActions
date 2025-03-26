"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bold, Italic, List, ListOrdered, Image, Link, Code, Eye, Edit } from "lucide-react"

interface MarkdownEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
}

export function MarkdownEditor({ initialValue = "", onChange }: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newValue = beforeText + prefix + selectedText + suffix + afterText
    handleChange(newValue)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + prefix.length + selectedText.length + suffix.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="flex items-center justify-between border-b p-2">
        <Tabs
          defaultValue="write"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "write" | "preview")}
        >
          <TabsList>
            <TabsTrigger value="write" className="gap-1">
              <Edit className="h-4 w-4" />
              <span>Write</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "write" && (
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("**", "**")}>
              <Bold className="h-4 w-4" />
              <span className="sr-only">Bold</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("*", "*")}>
              <Italic className="h-4 w-4" />
              <span className="sr-only">Italic</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("\n- ")}>
              <List className="h-4 w-4" />
              <span className="sr-only">Bullet List</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("\n1. ")}>
              <ListOrdered className="h-4 w-4" />
              <span className="sr-only">Numbered List</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("![alt text](", ")")}>
              <Image className="h-4 w-4" />
              <span className="sr-only">Image</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("[", "](url)")}>
              <Link className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => insertMarkdown("`", "`")}>
              <Code className="h-4 w-4" />
              <span className="sr-only">Code</span>
            </Button>
          </div>
        )}
      </div>

      <TabsContent value="write" className="flex-1 m-0 p-0">
        <textarea
          className="w-full h-full p-4 resize-none focus:outline-none bg-background"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your content in Markdown..."
        />
      </TabsContent>

      <TabsContent value="preview" className="flex-1 m-0 p-0">
        <ScrollArea className="h-full">
          <div className="p-4 prose dark:prose-invert max-w-none">
            {/* This would be replaced with a proper Markdown renderer */}
            <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br />") }} />
          </div>
        </ScrollArea>
      </TabsContent>
    </div>
  )
}

