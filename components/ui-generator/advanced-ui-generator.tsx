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
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Upload, Send, Wand2, Image, Code, Copy, Download, Eye, Brush, Loader, Check, Github, Search, RefreshCw, PanelLeft, Terminal, XCircle } from 'lucide-react'
import { optimizeUICode } from '@/lib/code-optimizer'
import { getSemanticUIApiClient } from '@/lib/21st-dev-api'

type UIFramework = 'react' | 'nextjs' | 'svelte';
type UILibrary = 'shadcn' | 'nextui' | 'flowbite';
type PromptType = 'sitebrew' | 'v0' | 'lovable' | 'bolt' | 'extended' | 'replit' | 'magic_patterns';

const frameworks: { value: UIFramework; label: string }[] = [
  { value: 'react', label: 'React' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'svelte', label: 'Svelte' },
];

const libraries: { value: UILibrary; label: string }[] = [
  { value: 'shadcn', label: 'shadcn/ui' },
  { value: 'nextui', label: 'NextUI' },
  { value: 'flowbite', label: 'Flowbite' },
];

const promptTypes: { value: PromptType; label: string }[] = [
  { value: 'v0', label: 'v0.dev' },
  { value: 'bolt', label: 'Bolt.dev' },
  { value: 'lovable', label: 'Lovable UI' },
  { value: 'magic_patterns', label: 'Magic Patterns' },
  { value: 'replit', label: 'Replit' },
  { value: 'sitebrew', label: 'Sitebrew' },
  { value: 'extended', label: 'Extended' },
];

interface SearchResult {
  name: string;
  preview_url: string;
  demo_id: number;
  component_data: {
    name: string;
    description: string;
  };
}

export function AdvancedUIGenerator() {
  const [tab, setTab] = useState<'search' | 'prompt' | 'github'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)
  const [promptType, setPromptType] = useState<PromptType>('v0')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [framework, setFramework] = useState<UIFramework>('nextjs')
  const [uiLibrary, setUILibrary] = useState<UILibrary>('shadcn')
  const [generatedCode, setGeneratedCode] = useState('')
  const [optimizedCode, setOptimizedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState('')
  const [apiKey, setApiKey] = useState('')
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Use the stored API key or the default one
      const key = apiKey || '7011db16ed56503907a40420543a3727b9f4e742331fbfe9a2f2c333a4ddabab';
      const api = getSemanticUIApiClient(key);
      
      const response = await api.searchComponents({
        search: searchQuery,
        page: 1,
        per_page: 20,
      });
      
      setSearchResults(response.results);
      
      if (response.results.length === 0) {
        setError('No results found. Try a different search query.');
      }
    } catch (error) {
      console.error('Error searching for components:', error);
      setError(`Error searching for components: ${(error as Error).message}`);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
    setGeneratedPrompt('');
    setTab('prompt');
  };
  
  const handleGeneratePrompt = async () => {
    if (!selectedResult) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const key = apiKey || '7011db16ed56503907a40420543a3727b9f4e742331fbfe9a2f2c333a4ddabab';
      const api = getSemanticUIApiClient(key);
      
      const response = await api.generatePrompt({
        prompt_type: promptType,
        demo_id: selectedResult.demo_id,
      });
      
      setGeneratedPrompt(response.prompt);
      setCustomPrompt(response.prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      setError(`Error generating prompt: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGenerateCode = async () => {
    if (!customPrompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Here we would call the AI service to generate code
      // For now, we'll simulate the response with a placeholder
      // In a real implementation, this would call the OpenAI or other API
      
      setTimeout(() => {
        const simulatedCode = `import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, User, Settings } from "lucide-react";

export function ${selectedResult?.component_data.name.replace(/\s+/g, '') || 'ExampleComponent'}() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>${selectedResult?.component_data.name || 'Example Component'}</CardTitle>
        <CardDescription>${selectedResult?.component_data.description || 'A generated component based on your requirements'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}`;
        
        setGeneratedCode(simulatedCode);
        
        // Optimize the code using our code optimizer
        const optimized = optimizeUICode(simulatedCode, {
          framework,
          uiLibrary,
          fixImports: true,
          fixIcons: true,
        });
        
        setOptimizedCode(optimized);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating code:', error);
      setError(`Error generating code: ${(error as Error).message}`);
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const downloadCode = (text: string, filename: string) => {
    const extension = framework === 'svelte' ? 'svelte' : 'tsx';
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleSubmitToGitHub = () => {
    setTab('github');
    // The actual GitHub submission would happen in the GitHub tab
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>OctaActions Advanced UI Generator</CardTitle>
          <CardDescription>
            Search for UI components, generate code with AI, and optimize for your project
          </CardDescription>
          <Tabs value={tab} onValueChange={(value) => setTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="search">
                <Search className="mr-2 h-4 w-4" />
                Search Components
              </TabsTrigger>
              <TabsTrigger value="prompt">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Code
              </TabsTrigger>
              <TabsTrigger value="github">
                <Github className="mr-2 h-4 w-4" />
                GitHub Integration
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="search" className="mt-0 space-y-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="search-query">Search for UI components</Label>
                <Input 
                  id="search-query" 
                  placeholder="e.g., dashboard layout, pricing table, contact form..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key (Optional)</Label>
              <Input 
                id="api-key" 
                placeholder="Enter your 21st.dev API key" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
              />
              <p className="text-xs text-muted-foreground">
                Using default key limits searches to 100 per day. For more, get a key from <a href="https://21st.dev" target="_blank" rel="noopener noreferrer" className="underline">21st.dev</a>
              </p>
            </div>
            
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            
            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Search Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((result) => (
                    <Card key={result.demo_id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video relative">
                        <img 
                          src={result.preview_url} 
                          alt={result.component_data.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{result.component_data.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {result.component_data.description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={() => handleSelectResult(result)}
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="prompt" className="mt-0 space-y-4">
            {selectedResult ? (
              <>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Selected Component</CardTitle>
                      </CardHeader>
                      <div className="aspect-video relative">
                        <img 
                          src={selectedResult.preview_url} 
                          alt={selectedResult.component_data.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{selectedResult.component_data.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedResult.component_data.description}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Framework</Label>
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
                        <Label>UI Library</Label>
                        <Select value={uiLibrary} onValueChange={(value) => setUILibrary(value as UILibrary)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select UI library" />
                          </SelectTrigger>
                          <SelectContent>
                            {libraries.map((lib) => (
                              <SelectItem key={lib.value} value={lib.value}>
                                {lib.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Prompt Type</Label>
                        <Select value={promptType} onValueChange={(value) => setPromptType(value as PromptType)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select prompt type" />
                          </SelectTrigger>
                          <SelectContent>
                            {promptTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={handleGeneratePrompt} 
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
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Prompt
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="custom-prompt">Prompt</Label>
                        {generatedPrompt && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(generatedPrompt)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        )}
                      </div>
                      <Textarea
                        id="custom-prompt"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="The prompt will appear here after you generate it, or you can write your own..."
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerateCode} 
                      disabled={isLoading || !customPrompt.trim()} 
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Generating Code...
                        </>
                      ) : (
                        <>
                          <Code className="mr-2 h-4 w-4" />
                          Generate Code
                        </>
                      )}
                    </Button>
                    
                    {generatedCode && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Generated Code</Label>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => copyToClipboard(optimizedCode || generatedCode)}
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
                              onClick={() => downloadCode(optimizedCode || generatedCode, selectedResult.component_data.name.replace(/\s+/g, '-').toLowerCase())}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleSubmitToGitHub}
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Submit
                            </Button>
                          </div>
                        </div>
                        <div className="relative rounded-md border">
                          <ScrollArea className="h-[400px] w-full">
                            <pre className="p-4 text-sm font-mono">
                              <code>{optimizedCode || generatedCode}</code>
                            </pre>
                          </ScrollArea>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">No Component Selected</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Search for and select a component from the Search tab to generate code
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setTab('search')}
                >
                  Go to Search
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="github" className="mt-0 space-y-4">
            {generatedCode ? (
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <PanelLeft className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">GitHub Repository Details</h3>
                  </div>
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="repo-owner">Repository Owner</Label>
                      <Input id="repo-owner" defaultValue="sheikh-vegeta" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repo-name">Repository Name</Label>
                      <Input id="repo-name" defaultValue="OctaActions" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="component-name">Component Name</Label>
                      <Input 
                        id="component-name" 
                        defaultValue={selectedResult?.component_data.name || 'MyComponent'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch-name">Branch Name</Label>
                      <Input 
                        id="branch-name" 
                        defaultValue={`component/${selectedResult?.component_data.name.replace(/\s+/g, '-').toLowerCase() || 'my-component'}`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">PR Details</h3>
                  </div>
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pr-title">PR Title</Label>
                      <Input 
                        id="pr-title" 
                        defaultValue={`Add ${selectedResult?.component_data.name || 'new'} component`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pr-description">PR Description</Label>
                      <Textarea 
                        id="pr-description" 
                        className="min-h-[100px]"
                        defaultValue={`## ${selectedResult?.component_data.name || 'New Component'}

${selectedResult?.component_data.description || 'A new component for the UI library'}

### Generated with OctaActions UI Generator`}
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Creating PR...
                    </>
                  ) : (
                    <>
                      <Github className="mr-2 h-4 w-4" />
                      Create GitHub PR
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Github className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium">No Generated Code</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Generate code first before submitting to GitHub
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setTab('prompt')}
                >
                  Generate Code
                </Button>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}

export function AdvancedUIGeneratorPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">OctaActions Advanced UI Generator</h1>
      <p className="text-muted-foreground mb-8">
        Search for UI components, generate code with AI, optimize for your project, and create GitHub PRs seamlessly.
      </p>
      <AdvancedUIGenerator />
    </div>
  )
}
