"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { UserButton } from "@clerk/nextjs"
import { CodeEditor } from "@/components/editor/code-editor"
import { FileExplorer } from "@/components/editor/file-explorer"
import { AIChat } from "@/components/editor/ai-chat"
import { GitPanel } from "@/components/editor/git-panel"
import { MobileEditor } from "@/components/editor/mobile-editor"
import { Code, FileCode, Folder, Github, Menu, MessageSquare, Play, Plus, Save, Settings, Terminal } from "lucide-react"

export function EditorShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("explorer")
  const [currentFile, setCurrentFile] = useState("index.js")
  const [currentFileContent, setCurrentFileContent] = useState(
    `// Welcome to OctaActions!\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));`,
  )
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const { theme } = useTheme()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Mock files for the file explorer
  const files = [
    { id: "1", name: "index.js", type: "file", content: currentFileContent },
    { id: "2", name: "styles.css", type: "file", content: "body { font-family: sans-serif; }" },
    {
      id: "3",
      name: "src",
      type: "folder",
      children: [
        {
          id: "4",
          name: "components",
          type: "folder",
          children: [
            { id: "5", name: "Button.js", type: "file", content: "// Button component" },
            { id: "6", name: "Card.js", type: "file", content: "// Card component" },
          ],
        },
        { id: "7", name: "utils.js", type: "file", content: "// Utility functions" },
      ],
    },
    { id: "8", name: "package.json", type: "file", content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}' },
  ]

  const handleFileSelect = (file: any) => {
    if (file.type === "file") {
      setCurrentFile(file.name)
      setCurrentFileContent(file.content)
    }
  }

  const handleEditorChange = (value: string) => {
    setCurrentFileContent(value)
  }

  // Render mobile version
  if (isMobile) {
    return (
      <MobileEditor
        files={files}
        currentFile={currentFile}
        currentFileContent={currentFileContent}
        onFileSelect={handleFileSelect}
        onEditorChange={handleEditorChange}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang as "en" | "bn")}
      />
    )
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center border-b px-4 lg:px-6">
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6" />
          <span className="font-semibold">OctaActions</span>
          {language === "bn" && <span className="text-xs text-muted-foreground font-bangla">দোয়েল দ্বারা চালিত</span>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle language={language} onLanguageChange={(lang) => setLanguage(lang as "en" | "bn")} />
          <Button variant="ghost" size="icon">
            <Save className="h-5 w-5" />
            <span className="sr-only">Save</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Play className="h-5 w-5" />
            <span className="sr-only">Run</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Sidebar */}
          {isSidebarOpen && (
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="explorer">
                    <Folder className="h-4 w-4" />
                    <span className="sr-only">Explorer</span>
                  </TabsTrigger>
                  <TabsTrigger value="git">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">Git</span>
                  </TabsTrigger>
                  <TabsTrigger value="extensions">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Extensions</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="explorer" className="p-0">
                  <div className="flex h-10 items-center justify-between border-b px-4">
                    <span className="text-xs font-medium">{language === "en" ? "EXPLORER" : "এক্সপ্লোরার"}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">New File</span>
                    </Button>
                  </div>
                  <FileExplorer files={files} onFileSelect={handleFileSelect} language={language} />
                </TabsContent>
                <TabsContent value="git" className="p-0">
                  <GitPanel language={language} />
                </TabsContent>
                <TabsContent value="extensions" className="p-0">
                  <div className="flex h-10 items-center border-b px-4">
                    <span className="text-xs font-medium">{language === "en" ? "EXTENSIONS" : "এক্সটেনশন"}</span>
                  </div>
                  <div className="p-4">
                    <Input
                      placeholder={language === "en" ? "Search extensions..." : "এক্সটেনশন খুঁজুন..."}
                      className="mb-4"
                    />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">ESLint</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "Integrates ESLint into VS Code" : "VS Code-এ ESLint একীভূত করে"}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          {language === "en" ? "Install" : "ইনস্টল"}
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Prettier</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "Code formatter using prettier" : "prettier ব্যবহার করে কোড ফরম্যাটার"}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          {language === "en" ? "Install" : "ইনস্টল"}
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">GitHub Copilot</div>
                          <div className="text-xs text-muted-foreground">
                            {language === "en" ? "AI-powered code completion" : "AI-চালিত কোড সম্পূর্ণতা"}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          {language === "en" ? "Install" : "ইনস্টল"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          )}

          {isSidebarOpen && <ResizableHandle />}

          {/* Editor */}
          <ResizablePanel defaultSize={isAIChatOpen ? 50 : 80}>
            <div className="flex h-full flex-col">
              <div className="flex h-10 items-center border-b px-4">
                <div className="flex items-center">
                  <FileCode className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentFile}</span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  value={currentFileContent}
                  onChange={handleEditorChange}
                  language={currentFile.split(".").pop() || "javascript"}
                  theme={
                    theme?.includes("ayu")
                      ? "ayu-dark"
                      : theme?.includes("andromeda")
                        ? "vs-dark"
                        : theme === "dark"
                          ? "vs-dark"
                          : "vs-light"
                  }
                />
              </div>
              <div className="flex h-10 items-center border-t px-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>JavaScript</span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <span>Ln 1, Col 1</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsAIChatOpen(!isAIChatOpen)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Toggle AI Chat</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Terminal className="h-4 w-4" />
                    <span className="sr-only">Toggle Terminal</span>
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>

          {/* AI Chat */}
          {isAIChatOpen && (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                <AIChat onClose={() => setIsAIChatOpen(false)} language={language} />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

