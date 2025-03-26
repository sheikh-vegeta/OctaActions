"use client"

import { useState } from "react"
import { Presentation, Layers, Smartphone, Monitor, Car, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface AIGenerationModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerate: (result: any) => void
}

export function AIGenerationModal({ isOpen, onClose, onGenerate }: AIGenerationModalProps) {
  const [activeTab, setActiveTab] = useState("presentation")
  const [prompt, setPrompt] = useState("")
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop" | "automotive">("mobile")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          type: activeTab,
          deviceType: activeTab === "prototype" ? deviceType : undefined,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      onGenerate(data)
      onClose()
    } catch (error) {
      console.error("Error generating content:", error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generate with AI</DialogTitle>
          <DialogDescription>Describe what you want to create and let AI generate it for you.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="presentation" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presentation" className="gap-2">
              <Presentation className="h-4 w-4" />
              <span>Presentation</span>
            </TabsTrigger>
            <TabsTrigger value="prototype" className="gap-2">
              <Layers className="h-4 w-4" />
              <span>Prototype</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="presentation" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="presentation-prompt">Describe your presentation</Label>
              <Textarea
                id="presentation-prompt"
                placeholder="Create a presentation about climate change with 5 slides. Include data visualizations and a call to action."
                className="min-h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </TabsContent>
          <TabsContent value="prototype" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="prototype-prompt">Describe your prototype</Label>
              <Textarea
                id="prototype-prompt"
                placeholder="Create a mobile app prototype for a food delivery service with a home screen, restaurant listing, and checkout flow."
                className="min-h-32"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Device Type</Label>
              <RadioGroup
                value={deviceType}
                onValueChange={(value) => setDeviceType(value as "mobile" | "desktop" | "automotive")}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center gap-1 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span>Mobile</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="desktop" id="desktop" />
                  <Label htmlFor="desktop" className="flex items-center gap-1 cursor-pointer">
                    <Monitor className="h-4 w-4" />
                    <span>Desktop</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="automotive" id="automotive" />
                  <Label htmlFor="automotive" className="flex items-center gap-1 cursor-pointer">
                    <Car className="h-4 w-4" />
                    <span>Automotive</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={!prompt.trim() || isLoading} className="gap-2">
            {isLoading ? (
              <>
                <span className="animate-spin">⟳</span>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

