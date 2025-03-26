"use client"

import React, { useState } from 'react'
import { Menu, X, Code, PlayCircle, Save, FileCode, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeEditor } from "./code-editor"
import { BengaliCodeEditor } from "./bengali-code-editor"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

interface MobileEditorProps {
  defaultLanguage?: string
  isBengali?: boolean
  files: any[]
  currentFile: string
  currentFileContent: string
  onFileSelect: (file: any) => void
  onEditorChange: (value: string) => void
  language: "en" | "bn"
  onLanguageChange: (language: string) => void
}

export function MobileEditor({
  defaultLanguage = "javascript",
  isBengali = false,
  files,
  currentFile,
  currentFileContent,
  onFileSelect,
  onEditorChange,
  language,
  onLanguageChange,
}: MobileEditorProps) {
  const [code, setCode] = useState<string>(currentFileContent);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "ai" | "files">("editor");
  
  // Function to run code (simplified for demo)
  const runCode = () => {
    setIsRunning(true);
    setOutput('Running...');
    
    setTimeout(() => {
      setOutput('Hello, world!\n\nExecution completed successfully.');
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">OctaActions</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    <Button variant="outline" className="w-full justify-start" onClick={() => onLanguageChange("en")}>
                      <FileCode className="mr-2 h-4 w-4" />
                      English
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => onLanguageChange("bn")}>
                      <FileCode className="mr-2 h-4 w-4" />
                      Bengali
                    </Button>
                    <div className="pt-4">
                      <div className="flex justify-between items-center pt-2 pb-2">
                        <h3 className="text-sm font-medium">Appearance</h3>
                        <ThemeToggle />
                      </div>
                      <div className="flex justify-between items-center pt-2 pb-2">
                        <h3 className="text-sm font-medium">Language</h3>
                        <LanguageToggle />
                      </div>
                    </div>
                    <div className="pt-4">
                      <h3 className="text-sm font-medium">Files</h3>
                      <FileExplorer
                        files={files}
                        onFileSelect={(file) => {
                          onFileSelect(file)
                          setIsMenuOpen(false)
                        }}
                        language={language}
                      />
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center">
            <Code className="h-5 w-5 mr-1 text-primary" />
            <span className="font-semibold text-sm">{isBengali ? 'দোয়েল এডিটর' : 'OctaEditor'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Save className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={runCode} disabled={isRunning}>
            <PlayCircle className="h-5 w-5" />
          </Button>
          <Smartphone className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Editor and Output Tabs */}
      <Tabs defaultValue="editor" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-2 mt-2">
          <TabsTrigger value="editor" className="text-sm">
            {isBengali ? 'কোড এডিটর' : 'Code Editor'}
          </TabsTrigger>
          <TabsTrigger value="output" className="text-sm">
            {isBengali ? 'আউটপুট' : 'Output'}
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-sm">
            {isBengali ? 'এআই চ্যাট' : 'AI Chat'}
          </TabsTrigger>
          <TabsTrigger value="files" className="text-sm">
            {isBengali ? 'ফাইল' : 'Files'}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="flex-1 p-2 pt-0">
          <div className="h-full border rounded-md overflow-hidden">
            {isBengali ? (
              <BengaliCodeEditor 
                value={code} 
                onChange={(value) => {
                  setCode(value)
                  onEditorChange(value)
                }} 
                language={language === "en" ? "javascript" : "bengali"} 
              />
            ) : (
              <CodeEditor 
                value={code} 
                onChange={(value) => {
                  setCode(value)
                  onEditorChange(value)
                }} 
                language={language === "en" ? "javascript" : "bengali"} 
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="output" className="flex-1 p-2 pt-0">
          <div className="h-full border rounded-md overflow-hidden bg-black p-4">
            <pre className="text-green-400 font-mono text-sm">{output || 'Run your code to see output here'}</pre>
          </div>
        </TabsContent>
        <TabsContent value="ai" className="flex-1 p-2 pt-0">
          <AIChat onClose={() => setActiveTab("editor")} language={language} isMobile={true} />
        </TabsContent>
        <TabsContent value="files" className="flex-1 p-2 pt-0">
          <div className="flex h-10 items-center border-b px-4">
            <span className="text-xs font-medium">{language === "en" ? "FILES" : "ফাইল"}</span>
          </div>
          <div className="flex-1 overflow-auto">
            <FileExplorer
              files={files}
              onFileSelect={(file) => {
                onFileSelect(file)
                setActiveTab("editor")
              }}
              language={language}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
