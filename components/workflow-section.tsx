"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function WorkflowSection() {
  return (
    <section id="workflow" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Workflow
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Seamless Development Process</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Experience a streamlined workflow from code to deployment, all within your browser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">GitHub Integration</h3>
            <p className="text-muted-foreground mb-6">
              Connect OctaActions to your GitHub account to automatically sync code to your repository. Perfect for
              project handoffs and advanced workflows.
            </p>
            <ul className="space-y-4">
              {[
                "Automatic repository synchronization",
                "Branch management and pull requests",
                "CI/CD pipeline integration",
                "Collaborative coding with team members",
                "Version control and code history",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="size-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg overflow-hidden shadow-xl border border-border/40"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3718-dNe3RCR3ebZF9oBUAIbGVCdfqIpwcy.png"
              width={600}
              height={400}
              alt="GitHub workflow visualization"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl border border-border/40"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3719-bvCZ3RCRxr2jaerKJlPtYjZicqjXMz.png"
              width={600}
              height={400}
              alt="Automated testing and deployment"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <h3 className="text-2xl font-bold mb-4">Automated Testing & Deployment</h3>
            <p className="text-muted-foreground mb-6">
              Run tests, scan code for vulnerabilities, and deploy your applications with confidence, all from within
              the browser.
            </p>
            <ul className="space-y-4">
              {[
                "Automated testing across multiple environments",
                "Code quality and security scanning",
                "One-click deployment to multiple platforms",
                "Environment variable management",
                "Deployment history and rollback capabilities",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="size-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

