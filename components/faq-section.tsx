"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about OctaActions.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "How does the browser-based IDE work?",
                answer:
                  "OctaActions runs entirely in your browser, eliminating the need for local setup. It uses WebAssembly and modern web technologies to provide a full development environment that includes code editing, debugging, terminal access, and more. Your code is securely stored and can be synchronized with GitHub repositories.",
              },
              {
                question: "Can I use OctaActions offline?",
                answer:
                  "While OctaActions is primarily designed as an online tool, we do offer limited offline functionality. You can continue coding during brief internet disruptions, and your changes will sync once you're back online. For extended offline work, we recommend using our desktop companion app.",
              },
              {
                question: "How secure is my code on OctaActions?",
                answer:
                  "Security is our top priority. All code and data are encrypted both in transit and at rest. We use industry-standard security practices, regular security audits, and comply with GDPR, CCPA, and other relevant regulations. Additionally, our Auth0 integration provides enterprise-grade authentication and access control.",
              },
              {
                question: "What programming languages and frameworks are supported?",
                answer:
                  "OctaActions supports a wide range of programming languages and frameworks including JavaScript, TypeScript, Python, Ruby, Go, Java, PHP, and more. For frontend development, we support React, Vue, Angular, Svelte, and other popular frameworks. Our backend support includes Node.js, Django, Rails, and various other frameworks.",
              },
              {
                question: "How does GitHub integration work?",
                answer:
                  "OctaActions connects directly to your GitHub account, allowing you to clone repositories, create branches, commit changes, and open pull requests without leaving the browser. Changes can be automatically synced, and you can view and resolve merge conflicts directly in the IDE. Our GitHub Actions integration also enables CI/CD workflows.",
              },
              {
                question: "Can I collaborate with my team in real-time?",
                answer:
                  "Yes, OctaActions supports real-time collaboration. Multiple team members can work on the same codebase simultaneously, with changes visible in real-time. Our collaboration features include shared terminals, live cursors, and integrated chat. You can also manage team permissions and access controls through our platform.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

