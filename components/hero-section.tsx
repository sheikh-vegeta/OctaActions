"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Code, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden relative">
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Full-Stack Browser IDE
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Code, Build, Deploy. All in Your Browser.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            OctaActions is a powerful browser-based development environment that eliminates local setup, provides
            real-time debugging, and integrates seamlessly with GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full h-12 px-8 text-base">
              Start Coding Now
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base">
              <Github className="mr-2 h-5 w-5" />
              Connect GitHub
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Code className="size-4 text-blue-500" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center gap-1">
              <Terminal className="size-4 text-blue-500" />
              <span>Multiple tech stacks</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="size-4 text-blue-500" />
              <span>One-click deployment</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3741-8cVwXYh7WAnqouMDwSUj6BPavISQC7.webp"
              width={1280}
              height={720}
              alt="OctaActions IDE interface"
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
          </div>
          <motion.div
            className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 blur-3xl opacity-70"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.8 : 0.7,
            }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 blur-3xl opacity-70"
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.8 : 0.7,
            }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  )
}

