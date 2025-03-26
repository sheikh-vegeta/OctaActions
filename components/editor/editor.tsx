"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Save,
  Play,
  Layers,
  Plus,
  Image,
  Type,
  Square,
  Presentation,
  Smartphone,
  Monitor,
  Car,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"

interface EditorProps {
  type: string
  id: string
}

export function Editor({ type, id }: EditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("design")
  const [showPreview, setShowPreview] = useState(false)
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop" | "tablet" | "automotive">("mobile")

  const isNew = id === "new"
  const isPresentation = type === "presentation"
  const isPrototype = type === "prototype"

  useEffect(() => {
    // Get device type from URL if it's a new prototype
    if (isNew && isPrototype) {
      const urlParams = new URLSearchParams(window.location.search)
      const device = urlParams.get("device") as "mobile" | "desktop" | "tablet" | "automotive"
      if (device) {
        setDeviceType(device)
      }
    }
  }, [isNew, isPrototype])

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Editor Header */}
      <header className="flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-sm font-medium">
              {isNew ? `New ${isPresentation ? "Presentation" : "Prototype"}` : "Untitled Project"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isPresentation
                ? "Presentation"
                : `${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} Prototype`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline-block">Save</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Play className="h-4 w-4" />
            <span className="hidden sm:inline-block">Preview</span>
          </Button>
        </div>
      </header>

      {/* Editor Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar - Layers/Assets */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <Tabs defaultValue="layers" className="h-full flex flex-col">
              <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2">
                <TabsTrigger value="layers">Layers</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
              </TabsList>
              <TabsContent value="layers" className="flex-1 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Layers</h3>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Layer</span>
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100%-2rem)]">
                  <div className="space-y-1">
                    {[
                      { name: "Background", type: "rectangle", visible: true },
                      { name: "Header", type: "group", visible: true },
                      { name: "Title", type: "text", visible: true },
                      { name: "Subtitle", type: "text", visible: true },
                      { name: "Image", type: "image", visible: true },
                      { name: "Button", type: "rectangle", visible: true },
                      { name: "Footer", type: "group", visible: false },
                    ].map((layer, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center justify-between rounded-md px-2 py-1 text-sm",
                          "hover:bg-muted/50 cursor-pointer",
                          i === 2 && "bg-muted/50",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn("h-3 w-3 rounded-full", layer.visible ? "bg-primary" : "bg-muted")} />
                          <span>{layer.name}</span>
                        </div>
                        <div className="flex items-center">
                          {layer.type === "rectangle" && <Square className="h-3 w-3 text-muted-foreground" />}
                          {layer.type === "text" && <Type className="h-3 w-3 text-muted-foreground" />}
                          {layer.type === "image" && <Image className="h-3 w-3 text-muted-foreground" />}
                          {layer.type === "group" && <Layers className="h-3 w-3 text-muted-foreground" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="assets" className="flex-1 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Assets</h3>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Asset</span>
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100%-2rem)]">
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-md bg-muted flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Canvas */}
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-2">
                <Tabs defaultValue="design" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="prototype">Prototype</TabsTrigger>
                    {isPresentation && <TabsTrigger value="present">Present</TabsTrigger>}
                    {isPrototype && <TabsTrigger value="code">Code</TabsTrigger>}
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2">
                  {isPrototype && (
                    <div className="flex items-center border rounded-md p-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={deviceType === "mobile" ? "secondary" : "ghost"}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setDeviceType("mobile")}
                            >
                              <Smartphone className="h-4 w-4" />
                              <span className="sr-only">Mobile</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Mobile</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={deviceType === "desktop" ? "secondary" : "ghost"}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setDeviceType("desktop")}
                            >
                              <Monitor className="h-4 w-4" />
                              <span className="sr-only">Desktop</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Desktop</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={deviceType === "automotive" ? "secondary" : "ghost"}
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setDeviceType("automotive")}
                            >
                              <Car className="h-4 w-4" />
                              <span className="sr-only">Automotive</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Automotive</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}

                  <Button variant="outline" size="sm" className="gap-1">
                    <Sparkles className="h-4 w-4" />
                    <span>AI Assist</span>
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 bg-muted/30">
                <div className="flex items-center justify-center h-full">
                  {isPresentation && (
                    <div className="aspect-[16/9] w-full max-w-4xl bg-background rounded-lg shadow-md border overflow-hidden">
                      <div className="h-full flex items-center justify-center">
                        <Presentation className="h-16 w-16 text-muted-foreground/50" />
                      </div>
                    </div>
                  )}

                  {isPrototype && (
                    <div
                      className={cn(
                        "bg-background rounded-lg shadow-md border overflow-hidden",
                        deviceType === "mobile" && "aspect-[9/16] max-h-[80vh]",
                        deviceType === "desktop" && "aspect-[16/9] w-full max-w-4xl",
                        deviceType === "automotive" && "aspect-[21/9] w-full max-w-4xl",
                      )}
                    >
                      <div className="h-full flex items-center justify-center">
                        {deviceType === "mobile" && <Smartphone className="h-16 w-16 text-muted-foreground/50" />}
                        {deviceType === "desktop" && <Monitor className="h-16 w-16 text-muted-foreground/50" />}
                        {deviceType === "automotive" && <Car className="h-16 w-16 text-muted-foreground/50" />}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar - Properties */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <h3 className="text-sm font-medium">Properties</h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground">POSITION</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs">X</label>
                        <input
                          type="number"
                          className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                          value="100"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Y</label>
                        <input
                          type="number"
                          className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                          value="100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground">SIZE</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs">Width</label>
                        <input
                          type="number"
                          className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                          value="200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Height</label>
                        <input
                          type="number"
                          className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                          value="50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground">APPEARANCE</h4>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <label className="text-xs">Fill</label>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-primary" />
                          <input
                            type="text"
                            className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                            value="#3B82F6"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Border</label>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md border-2 border-border" />
                          <input
                            type="text"
                            className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                            value="1px solid #E2E8F0"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Border Radius</label>
                        <input
                          type="number"
                          className="w-full h-8 rounded-md border bg-transparent px-2 text-sm"
                          value="4"
                        />
                      </div>
                    </div>
                  </div>

                  {activeTab === "prototype" && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium text-muted-foreground">INTERACTIONS</h4>
                      <div className="rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">On Click</span>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">
                            Add
                          </Button>
                        </div>
                      </div>
                      <div className="rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">On Hover</span>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

