"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Figma, Import, ExternalLink } from "lucide-react"

export function FigmaIntegration() {
  const [figmaUrl, setFigmaUrl] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleImport = () => {
    if (!figmaUrl) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle import success
      setFigmaUrl("")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Figma className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Figma Integration</h2>
          <p className="text-muted-foreground">Import designs from Figma and convert them to interactive prototypes.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect to Figma</CardTitle>
          <CardDescription>
            {isConnected
              ? "Your Figma account is connected. You can now import designs."
              : "Connect your Figma account to import designs."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <Button onClick={handleConnect} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Figma className="h-4 w-4" />
                  <span>Connect Figma Account</span>
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="size-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>
                    Connected as <strong>user@example.com</strong>
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>

              <div className="space-y-2">
                <label htmlFor="figma-url" className="text-sm font-medium">
                  Figma File URL
                </label>
                <div className="flex gap-2">
                  <Input
                    id="figma-url"
                    placeholder="https://www.figma.com/file/..."
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                  />
                  <Button onClick={handleImport} disabled={!figmaUrl || isLoading} className="gap-1">
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⟳</span>
                        <span>Importing...</span>
                      </>
                    ) : (
                      <>
                        <Import className="h-4 w-4" />
                        <span>Import</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">Learn more about our Figma integration</p>
          <Button variant="ghost" size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>Documentation</span>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Imports</CardTitle>
            <CardDescription>Your recently imported Figma designs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent imports</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Pre-built templates for common design patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {["Mobile App", "Dashboard", "Landing Page", "E-commerce"].map((template, i) => (
                <Button key={i} variant="outline" className="h-20 flex flex-col gap-1">
                  <span>{template}</span>
                  <span className="text-xs text-muted-foreground">Template</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

