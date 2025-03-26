"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ChevronRight, ChevronDown, FileIcon, FolderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileExplorerProps {
  files: any[]
  onFileSelect: (file: any) => void
  language?: "en" | "bn"
}

export function FileExplorer({ files, onFileSelect, language = "en" }: FileExplorerProps) {
  return (
    <ScrollArea className="h-[calc(100vh-6.5rem)]">
      <div className="p-2">
        {files.map((file) => (
          <FileItem key={file.id} file={file} onFileSelect={onFileSelect} language={language} />
        ))}
      </div>
    </ScrollArea>
  )
}

interface FileItemProps {
  file: any
  onFileSelect: (file: any) => void
  level?: number
  language?: "en" | "bn"
}

function FileItem({ file, onFileSelect, level = 0, language = "en" }: FileItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleFolder = () => {
    setIsOpen(!isOpen)
  }

  const handleFileClick = () => {
    if (file.type === "file") {
      onFileSelect(file)
    } else {
      toggleFolder()
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col">
          <div
            className={cn(
              "flex items-center py-1 px-2 text-sm rounded-md cursor-pointer hover:bg-muted",
              file.type === "file" ? "pl-6" : "",
            )}
            style={{ paddingLeft: `${level * 12 + (file.type === "file" ? 0 : 6)}px` }}
            onClick={handleFileClick}
          >
            {file.type === "folder" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 mr-1"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFolder()
                }}
              >
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            {file.type === "folder" ? (
              <FolderIcon className="h-4 w-4 mr-2 text-blue-500" />
            ) : (
              <FileIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <span className="flex-1 truncate">{file.name}</span>
          </div>
          {file.type === "folder" && isOpen && file.children && (
            <div>
              {file.children.map((child: any) => (
                <FileItem
                  key={child.id}
                  file={child}
                  onFileSelect={onFileSelect}
                  level={level + 1}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {file.type === "file" ? (
          <>
            <ContextMenuItem onClick={() => onFileSelect(file)}>{language === "en" ? "Open" : "খুলুন"}</ContextMenuItem>
            <ContextMenuItem>{language === "en" ? "Rename" : "পুনঃনামকরণ"}</ContextMenuItem>
            <ContextMenuItem>{language === "en" ? "Duplicate" : "প্রতিলিপি"}</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive">{language === "en" ? "Delete" : "মুছে ফেলুন"}</ContextMenuItem>
          </>
        ) : (
          <>
            <ContextMenuItem onClick={toggleFolder}>
              {isOpen ? (language === "en" ? "Collapse" : "সংকুচিত করুন") : language === "en" ? "Expand" : "প্রসারিত করুন"}
            </ContextMenuItem>
            <ContextMenuItem>{language === "en" ? "New File" : "নতুন ফাইল"}</ContextMenuItem>
            <ContextMenuItem>{language === "en" ? "New Folder" : "নতুন ফোল্ডার"}</ContextMenuItem>
            <ContextMenuItem>{language === "en" ? "Rename" : "পুনঃনামকরণ"}</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive">{language === "en" ? "Delete" : "মুছে ফেলুন"}</ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}

