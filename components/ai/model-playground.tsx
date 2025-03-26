"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Loader, Bot, Terminal, Settings } from "lucide-react"
import { useAI } from "./ai-provider"

export function ModelPlayground() {
  const { models, selectedModel, setSelectedModel, generateCompletion, isGenerating } = useAI()
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [temperature, setTemperature] = useState(0.7)
  const [tokens, setTokens] = useState(1000)
  const [showSettings, setShowSettings] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return
    
    setResponse("")
    
    try {
      const result = await generateCompletion(prompt, {
        temperature,
        maxTokens: tokens,
        topP: 0.9,
      })
      
      setResponse(result)
    } catch (error) {
      setResponse(`Error: ${error.message}`)
    }
  }

  const groupedModels = models.reduce((acc, model) => {
    const provider = model.provider
    if (!acc[provider]) {
      acc[provider] = []
    }
    acc[provider].push(model)
    return acc
  }, {})

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            AI Model Playground
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </CardTitle>
        <CardDescription>
          Try different AI models including NVIDIA, OpenRouter, and more
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label>Model</Label>
          <Select
            value={selectedModel}
            onValueChange={setSelectedModel}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(groupedModels).map(([provider, providerModels]) => (
                <React.Fragment key={provider}>
                  <div className="px-2 py-1.5 text-sm font-semibold">{provider}</div>
                  {providerModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {showSettings && (
          <div className="space-y-4 mb-4 p-4 border rounded-md">
            <div>
              <div className="flex justify-between mb-2">
                <Label>Temperature: {temperature.toFixed(1)}</Label>
              </div>
              <Slider
                value={[temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(values) => setTemperature(values[0])}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Max Tokens: {tokens}</Label>
              </div>
              <Slider
                value={[tokens]}
                min={100}
                max={4000}
                step={100}
                onValueChange={(values) => setTokens(values[0])}
              />
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <Label>Prompt</Label>
            <Textarea
              placeholder="Enter your prompt here..."
              className="min-h-[100px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label>Response</Label>
              {isGenerating && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader className="mr-2 h-3 w-3 animate-spin" />
                  Generating...
                </div>
              )}
            </div>
            <div className="relative border rounded-md p-3 min-h-[200px] bg-muted/50">
              <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-[400px]">
                {response || "Response will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Terminal className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
