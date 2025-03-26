"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromptInput, PromptInputTextarea, PromptInputActions, PromptInputAction, PromptInputSubmit } from "@/components/ui/prompt-input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, Send, Wand2, Image, Code, Copy, Download, Eye, Brush, Loader, Check } from 'lucide-react'
import { generateUIComponent, analyzeUIImage, generateComponentFromAnalysis } from '@/lib/ui-generation'
import { cn } from '@/lib/utils'

type UIFramework = 'shadcn' | 'nextui' | 'tailwind' | 'chakra' | 'mantine';
type UIComponentType = 'form' | 'card' | 'table' | 'dashboard' | 'landing' | 'auth' | 'custom';
type AIProvider = 'openai' | 'openrouter' | 'nvidia' | 'replicate';

const frameworks: { value: UIFramework; label: string }[] = [
  { value: 'shadcn', label: 'shadcn/ui' },
  { value: 'nextui', label: 'NextUI' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'chakra', label: 'Chakra UI' },
  { value: 'mantine', label: 'Mantine' },
];

const componentTypes: { value: UIComponentType; label: string }[] = [
  { value: 'form', label: 'Form' },
  { value: 'card', label: 'Card' },
  { value: 'table', label: 'Table' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'auth', label: 'Authentication' },
  { value: 'custom', label: 'Custom' },
];

const aiProviders: { value: AIProvider; label: string }[] = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'openrouter', label: 'OpenRouter' },
  { value: 'nvidia', label: 'NVIDIA AI' },
  { value: 'replicate', label: 'Replicate' },
];

const models: Record<AIProvider, { id: string; name: string }[]> = {
  openai: [
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  ],
  openrouter: [
    { id: 'openai/gpt-4o', name: 'GPT-4o' },
    { id: 'anthropic/claude-3-7-sonnet', name: 'Claude 3.7 Sonnet' },
  ],
  nvidia: [
    { id: 'meta/codellama-70b', name: 'CodeLlama 70B' },
    { id: 'nvidia/llama-3.3-nemotron-super-49b-v1', name: 'Llama 3.3 Nemotron' },
  ],
  replicate: [
    { id: 'meta/llama-3-70b-instruct', name: 'Llama 3 70B' },
    { id: 'mistralai/mixtral-8x7b-instruct-v0.1', name: 'Mixtral 8x7B' },
  ],
};

export function UIGenerator() {
  const [tab, setTab] = useState<'text' | 'image'>('text')
  const [prompt, setPrompt] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [imageAnalysis, setImageAnalysis] = useState('')
  const [framework, setFramework] = useState<UIFramework>('shadcn')
  const [componentType, setComponentType] = useState<UIComponentType>('custom')
  const [provider, setProvider] = useState<AIProvider>('openai')
  const [modelId, setModelId] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [isResponsive, setIsResponsive] = useState(true)
  const [supportsDarkMode, setSupportsDarkMode] = useState(true)
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Set default model when provider changes
    if (models[provider]?.length > 0) {
      setModelId(models[provider][0].id)
    }
  }, [provider])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result?.toString().split(',')[1];
      if (base64) {
        setImageBase64(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = async () => {
    if (!imageBase64) return;
    
    setIsLoading(true);
    try {
      const analysis = await analyzeUIImage(imageBase64, provider);
      setImageAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Error analyzing image: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFromPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const code = await generateUIComponent({
        prompt,
        framework,
        componentType,
        responsive: isResponsive,
        darkMode: supportsDarkMode,
        provider,
        modelId,
        temperature,
      });
      
      setGeneratedCode(code);
    } catch (error) {
      console.error('Error generating UI component:', error);
      alert('Error generating UI component: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFromAnalysis = async () => {
    if (!imageAnalysis.trim()) return;
    
    setIsLoading(true);
    try {
      const code = await generateComponentFromAnalysis(imageAnalysis, framework);
      setGeneratedCode(code);
    } catch (error) {
      console.error('Error generating from analysis:', error);
      alert('Error generating from analysis: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const extension = framework === 'tailwind' ? 'jsx' : 'tsx';
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-component.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>OctaActions UI Generator</CardTitle>
          <CardDescription>
            Generate UI components from text prompts or images using AI
          </CardDescription>
          <Tabs value={tab} onValueChange={(value) => setTab(value as 'text' | 'image')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Prompt</TabsTrigger>
              <TabsTrigger value="image">Image Analysis</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="text" className="mt-0 space-y-4">
            <div className="space-y-4">
              <PromptInput
                value={prompt}
                onValueChange={setPrompt}
                isLoading={isLoading}
                onSubmit={handleGenerateFromPrompt}
                maxHeight={300}
              >
                <PromptInputTextarea 
                  placeholder="Describe the UI component you want to generate..."
                  className="min-h-[120px]"
                />
                <PromptInputActions>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Wand2 className="h-3 w-3" />
                    <span>Describe your UI component in detail</span>
                  </div>
                  <PromptInputAction tooltip="Send">
                    <PromptInputSubmit>
                      <Send className="h-4 w-4" />
                    </PromptInputSubmit>
                  </PromptInputAction>
                </PromptInputActions>
              </PromptInput>
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="mt-0 space-y-4">
            <div className="space-y-4">
              {!imageBase64 ? (
                <div 
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <h3 className="font-medium">Upload UI Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop or click to upload
                    </p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    aria-label="Upload image"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg border">
                    <img 
                      src={`data:image/jpeg;base64,${imageBase64}`} 
                      alt="Uploaded UI design" 
                      className="w-full object-contain max-h-[300px]" 
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm" 
                      onClick={() => setImageBase64('')}
                    >
                      Change
                    </Button>
                  </div>
                  
                  {!imageAnalysis ? (
                    <Button 
                      onClick={handleAnalyzeImage} 
                      disabled={isLoading} 
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Image className="mr-2 h-4 w-4" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <Label className="mb-2 block">Image Analysis</Label>
                        <div className="max-h-[200px] overflow-y-auto text-sm">
                          {imageAnalysis}
                        </div>
                      </div>
                      <Button 
                        onClick={handleGenerateFromAnalysis} 
                        disabled={isLoading} 
                        className="w-full"
                      >
                        {isLoading ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Code className="mr-2 h-4 w-4" />
                            Generate Component
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>UI Framework</Label>
                <Select value={framework} onValueChange={(value) => setFramework(value as UIFramework)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((fw) => (
                      <SelectItem key={fw.value} value={fw.value}>
                        {fw.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Component Type</Label>
                <Select value={componentType} onValueChange={(value) => setComponentType(value as UIComponentType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select component type" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>AI Provider</Label>
                <Select value={provider} onValueChange={(value) => setProvider(value as AIProvider)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiProviders.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Model</Label>
                <Select value={modelId} onValueChange={setModelId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models[provider].map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Temperature: {temperature.toFixed(1)}</Label>
              </div>
              <Slider
                value={[temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(values) => setTemperature(values[0])}
              />
              <p className="text-xs text-muted-foreground">
                Lower values produce more predictable output, higher values more creative.
              </p>
            </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="responsive" 
                  checked={isResponsive} 
                  onCheckedChange={setIsResponsive} 
                />
                <Label htmlFor="responsive">Responsive design</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="darkMode" 
                  checked={supportsDarkMode} 
                  onCheckedChange={setSupportsDarkMode} 
                />
                <Label htmlFor="darkMode">Dark mode support</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {generatedCode && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Generated Component</CardTitle>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={downloadCode}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="rounded-md bg-muted p-4 overflow-x-auto text-sm">
                <code className="language-tsx">{generatedCode}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export function UIGeneratorPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">OctaActions UI Generator</h1>
      <p className="text-muted-foreground mb-8">
        Generate UI components from text prompts or images using AI. Supports multiple frameworks and can analyze design mockups.
      </p>
      <UIGenerator />
    </div>
  )
}
