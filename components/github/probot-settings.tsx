"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { updateRepositoryConfig } from "@/lib/github/config-service"

interface ProbotSettingsProps {
  owner: string
  repo: string
  initialConfig?: any
}

export function ProbotSettings({ owner, repo, initialConfig }: ProbotSettingsProps) {
  const [config, setConfig] = useState(
    initialConfig || {
      features: {
        codeReview: true,
        issueManagement: true,
        cicd: false,
      },
      settings: {
        language: "en",
        theme: "light",
      },
    },
  )
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setConfig({
      ...config,
      features: {
        ...config.features,
        [feature]: checked,
      },
    })
  }

  const handleSettingChange = (setting: string, value: any) => {
    setConfig({
      ...config,
      settings: {
        ...config.settings,
        [setting]: value,
      },
    })
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      await updateRepositoryConfig(owner, repo, config)
      toast({
        title: "Success",
        description: "Repository settings updated successfully",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to update repository settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository Settings</CardTitle>
        <CardDescription>
          Configure automation for {owner}/{repo}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="features">
          <TabsList className="mb-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="code-review"
                  checked={config.features.codeReview}
                  onCheckedChange={(checked) => handleFeatureToggle("codeReview", !!checked)}
                />
                <Label htmlFor="code-review">Automated Code Review</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="issue-management"
                  checked={config.features.issueManagement}
                  onCheckedChange={(checked) => handleFeatureToggle("issueManagement", !!checked)}
                />
                <Label htmlFor="issue-management">Issue Management</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cicd"
                  checked={config.features.cicd}
                  onCheckedChange={(checked) => handleFeatureToggle("cicd", !!checked)}
                />
                <Label htmlFor="cicd">CI/CD Integration</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={config.settings.language === "en" ? "default" : "outline"}
                    onClick={() => handleSettingChange("language", "en")}
                  >
                    English
                  </Button>
                  <Button
                    variant={config.settings.language === "bn" ? "default" : "outline"}
                    onClick={() => handleSettingChange("language", "bn")}
                  >
                    Bengali
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={config.settings.theme === "light" ? "default" : "outline"}
                    onClick={() => handleSettingChange("theme", "light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={config.settings.theme === "dark" ? "default" : "outline"}
                    onClick={() => handleSettingChange("theme", "dark")}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={config.settings.theme === "system" ? "default" : "outline"}
                    onClick={() => handleSettingChange("theme", "system")}
                  >
                    System
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm overflow-auto">{JSON.stringify(config, null, 2)}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                This configuration will be saved to <code>.github/octaactions.yml</code> in your repository.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </Card>
  )
}

