"use client"

import { ModelPlayground } from "@/components/ai/model-playground"

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">OctaActions AI Model Playground</h1>
      <p className="text-muted-foreground mb-8">
        Experiment with various AI models from different providers including OpenAI, NVIDIA, HuggingFace, and OpenRouter.
      </p>
      <ModelPlayground />
    </div>
  )
}
