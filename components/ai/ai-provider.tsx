"use client"

import { InferenceClient } from "@huggingface/inference"
import React from "react"

import { createContext, useContext, useState } from "react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { groq } from "@ai-sdk/groq"
import { anthropic } from "@ai-sdk/anthropic"
import { generateHuggingFaceCompletion } from "@/lib/huggingface"
import { generateNvidiaCompletion } from "@/lib/nvidia-ai"
import { generateOpenRouterCompletion } from "@/lib/openrouter"

type AIModel = {
  id: string
  name: string
  provider: string
  contextLength: number
  supportsVision: boolean
  supportsStreaming: boolean
  supportsToolCalling?: boolean
}

type AIContextType = {
  models: AIModel[]
  selectedModel: string
  setSelectedModel: (modelId: string) => void
  generateCompletion: (prompt: string, options?: any) => Promise<string>
  isGenerating: boolean
}

const availableModels: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    contextLength: 128000,
    supportsVision: true,
    supportsStreaming: true,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    contextLength: 128000,
    supportsVision: true,
    supportsStreaming: true,
  },
  {
    id: "qwen-72b",
    name: "Qwen 72B",
    provider: "HuggingFace",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "qwen-7b",
    name: "Qwen 7B",
    provider: "HuggingFace",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "llama-3-70b-instruct",
    name: "Llama 3 70B",
    provider: "Groq",
    contextLength: 8192,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "llama-3-8b-instruct",
    name: "Llama 3 8B",
    provider: "Groq",
    contextLength: 8192,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    contextLength: 200000,
    supportsVision: true,
    supportsStreaming: true,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    contextLength: 200000,
    supportsVision: true,
    supportsStreaming: true,
  },
  {
    id: "deepseek-ai/DeepSeek-V3-0324",
    name: "DeepSeek V3",
    provider: "HuggingFace",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    name: "Mixtral 8x7B",
    provider: "HuggingFace",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "anthropic/R1-1776",
    name: "R1 1776",
    provider: "Anthropic",
    contextLength: 192000,
    supportsVision: true,
    supportsStreaming: true,
  },
  // NVIDIA AI Models
  {
    id: "nvidia/llama-3.3-nemotron-super-49b-v1",
    name: "Llama 3.3 Nemotron 49B",
    provider: "NVIDIA",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "mistralai/mistral-small-24b-instruct",
    name: "Mistral Small 24B",
    provider: "NVIDIA",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "qwen/qwq-32b",
    name: "Qwen QWQ 32B",
    provider: "NVIDIA",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  {
    id: "meta/llama-3.3-70b-instruct",
    name: "Llama 3.3 70B Instruct",
    provider: "NVIDIA",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
    supportsToolCalling: true,
  },
  {
    id: "meta/codellama-70b",
    name: "CodeLlama 70B",
    provider: "NVIDIA",
    contextLength: 32768,
    supportsVision: false,
    supportsStreaming: true,
  },
  // OpenRouter Models
  {
    id: "openai/gpt-4o",
    name: "GPT-4o (OpenRouter)",
    provider: "OpenRouter",
    contextLength: 128000,
    supportsVision: true,
    supportsStreaming: true,
    supportsToolCalling: true,
  },
  {
    id: "anthropic/claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet (OpenRouter)",
    provider: "OpenRouter",
    contextLength: 200000,
    supportsVision: true,
    supportsStreaming: true,
    supportsToolCalling: true,
  },
]

const AIContext = createContext<AIContextType>({
  models: availableModels,
  selectedModel: "gpt-4o",
  setSelectedModel: () => {},
  generateCompletion: async () => "",
  isGenerating: false,
})

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const generateCompletion = async (prompt: string, options: any = {}) => {
    setIsGenerating(true)
    try {
      const model = availableModels.find((m) => m.id === selectedModel)
      
      if (!model) {
        throw new Error(`Model ${selectedModel} not found`)
      }

      const messages = [{ role: "user", content: prompt }]

      let result = ""

      if (model.provider === "OpenAI") {
        result = await generateText({
          model: openai(selectedModel),
          messages,
          ...options,
        })
      } else if (model.provider === "Groq") {
        result = await generateText({
          model: groq(selectedModel),
          messages,
          ...options,
        })
      } else if (model.provider === "Anthropic") {
        result = await generateText({
          model: anthropic(selectedModel),
          messages,
          ...options,
        })
      } else if (model.provider === "HuggingFace") {
        // Use our custom HuggingFace implementation
        result = await generateHuggingFaceCompletion({
          model: selectedModel,
          messages,
          maxTokens: options.maxTokens || 500,
          temperature: options.temperature || 0.7,
        })
      } else if (model.provider === "NVIDIA") {
        // Use our NVIDIA AI implementation
        result = await generateNvidiaCompletion({
          model: selectedModel,
          messages,
          temperature: options.temperature || 0.6,
          topP: options.topP || 0.7,
          maxTokens: options.maxTokens || 1024,
          frequencyPenalty: options.frequencyPenalty || 0,
          presencePenalty: options.presencePenalty || 0,
        })
      } else if (model.provider === "OpenRouter") {
        // Use our OpenRouter implementation
        result = await generateOpenRouterCompletion({
          model: selectedModel,
          messages,
          temperature: options.temperature || 0.7,
          topP: options.topP || 0.9,
          maxTokens: options.maxTokens || 2048,
          tools: options.tools,
          toolChoice: options.toolChoice,
        })
      } else {
        throw new Error(`Provider ${model.provider} not supported`)
      }

      return result
    } catch (error) {
      console.error("Error generating completion:", error)
      throw error
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AIContext.Provider
      value={{
        models: availableModels,
        selectedModel,
        setSelectedModel,
        generateCompletion,
        isGenerating,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export const useAI = () => useContext(AIContext)
