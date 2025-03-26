"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Smartphone, Zap, Wifi, Cloud, ArrowRight } from "lucide-react"

export function MobileAppSection() {
  return (
    <section id="mobile-app" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Mobile App
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Develop From Anywhere</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Create, share, and host web apps all from the palm of your hand with our native mobile apps for Android and
            iOS.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Full Development Environment in Your Pocket</h3>
                <p className="text-muted-foreground">
                  Our mobile apps provide the same powerful features as our web platform, optimized for touch interfaces
                  and on-the-go development.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-blue-500" />,
                    title: "Native Performance",
                    description: "Optimized for iOS and Android devices with native performance and features.",
                  },
                  {
                    icon: <Wifi className="h-5 w-5 text-blue-500" />,
                    title: "Offline Support",
                    description:
                      "Continue coding even without an internet connection, with automatic syncing when you're back online.",
                  },
                  {
                    icon: <Cloud className="h-5 w-5 text-blue-500" />,
                    title: "Seamless Sync",
                    description:
                      "Your projects automatically sync between all your devices, so you can switch between desktop and mobile seamlessly.",
                  },
                  {
                    icon: <Smartphone className="h-5 w-5 text-blue-500" />,
                    title: "Touch Optimized",
                    description:
                      "UI designed specifically for touch interfaces, with gestures and shortcuts for efficient coding.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="gap-2 rounded-full">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M17.523 15.3414C17.523 16.0828 16.9104 16.8241 16.0453 16.8241H8.01509C7.15002 16.8241 6.53745 16.0828 6.53745 15.3414V8.67241C6.53745 7.93103 7.15002 7.18966 8.01509 7.18966H16.0453C16.9104 7.18966 17.523 7.93103 17.523 8.67241V15.3414ZM16.0453 19.3793H8.01509C5.47338 19.3793 3.54695 17.5172 3.54695 15.3414V8.67241C3.54695 6.49655 5.47338 4.63448 8.01509 4.63448H16.0453C18.587 4.63448 20.5134 6.49655 20.5134 8.67241V15.3414C20.5134 17.5172 18.587 19.3793 16.0453 19.3793Z" />
                    <path d="M12.0302 14.6207C11.7731 14.6207 11.5159 14.4828 11.3873 14.2069L9.49364 10.3448C9.30606 9.93103 9.49364 9.51724 9.87984 9.37931C10.266 9.24138 10.7808 9.37931 10.9684 9.79311L12.0302 12.1379L13.092 9.79311C13.2796 9.37931 13.7944 9.24138 14.1806 9.37931C14.5668 9.51724 14.7543 9.93103 14.5668 10.3448L12.6731 14.2069C12.5445 14.4828 12.2873 14.6207 12.0302 14.6207Z" />
                  </svg>
                  <span>Download for Android</span>
                </Button>
                <Button className="gap-2 rounded-full">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  <span>Download for iOS</span>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -z-10 size-80 rounded-full bg-blue-500/20 blur-3xl opacity-70 -top-10 -right-10"></div>
              <div className="relative border-8 border-background rounded-[3rem] shadow-xl overflow-hidden w-[280px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-20 bg-background rounded-b-xl"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3740-B36tdnWAI0MxEdA5e1HCAkgs00eHMN.png"
                  width={280}
                  height={600}
                  alt="OctaActions mobile app"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 text-center">
          <Button size="lg" className="rounded-full gap-2">
            Learn More About Our Mobile Apps
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

