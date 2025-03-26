"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import {
  Code,
  Github,
  Layers,
  Laptop,
  SmartphoneIcon as MobileIcon,
  Sparkles,
  Zap,
  PresentationIcon,
  LayoutIcon,
  FileIcon,
  PencilIcon,
} from "lucide-react"

export function LandingPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "bn">("en")

  const translations = {
    en: {
      title: "Design, Code, Present.",
      subtitle: "All in One Platform.",
      description:
        "OctaActions combines the power of AI with a modern code editor to help you build better software, create interactive presentations, and design prototypes. Design with AI, code with confidence, and present with impact.",
      getStarted: "Get Started Free",
      continueWithGithub: "Continue with GitHub",
      features: {
        editor: "AI-Powered Editor",
        mobile: "Mobile Support",
        github: "GitHub Integration",
        multilingual: "Multilingual Support",
        presentations: "Interactive Presentations",
        prototypes: "Multi-device Prototypes",
        templates: "Pre-built Templates",
        figma: "Figma Integration",
      },
      sections: {
        features: "Features",
        presentations: "Presentations",
        prototypes: "Prototypes",
        templates: "Templates",
        about: "About",
      },
    },
    bn: {
      title: "ডিজাইন, কোড, প্রেজেন্ট।",
      subtitle: "সবকিছু একটি প্ল্যাটফর্মে।",
      description:
        "অক্টাঅ্যাকশনস আপনাকে উন্নত সফটওয়্যার তৈরি করতে, ইন্টারেক্টিভ প্রেজেন্টেশন তৈরি করতে এবং প্রোটোটাইপ ডিজাইন করতে সাহায্য করার জন্য AI এর শক্তিকে একটি আধুনিক কোড এডিটরের সাথে সংযুক্ত করে। AI দিয়ে ডিজাইন করুন, আত্মবিশ্বাসের সাথে কোড করুন এবং প্রভাবশালী উপস্থাপনা করুন।",
      getStarted: "বিনামূল্যে শুরু করুন",
      continueWithGithub: "GitHub দিয়ে চালিয়ে যান",
      features: {
        editor: "AI-পাওয়ার্ড এডিটর",
        mobile: "মোবাইল সাপোর্ট",
        github: "GitHub ইন্টিগ্রেশন",
        multilingual: "বহুভাষিক সমর্থন",
        presentations: "ইন্টারেক্টিভ প্রেজেন্টেশন",
        prototypes: "মাল্টি-ডিভাইস প্রোটোটাইপ",
        templates: "প্রি-বিল্ট টেমপ্লেট",
        figma: "ফিগমা ইন্টিগ্রেশন",
      },
      sections: {
        features: "বৈশিষ্ট্য",
        presentations: "প্রেজেন্টেশন",
        prototypes: "প্রোটোটাইপ",
        templates: "টেমপ্লেট",
        about: "সম্পর্কে",
      },
    },
  }

  const content = translations[language]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">OctaActions</span>
            {language === "bn" && <span className="text-sm text-muted-foreground font-bangla">দোয়েল দ্বারা চালিত</span>}
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {content.sections.features}
            </Link>
            <Link
              href="#presentations"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {content.sections.presentations}
            </Link>
            <Link
              href="#prototypes"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {content.sections.prototypes}
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {content.sections.templates}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle language={language} onLanguageChange={(lang) => setLanguage(lang as "en" | "bn")} />
            <ThemeToggle />
            <Button variant="outline" onClick={() => router.push("/login")}>
              {language === "en" ? "Log in" : "লগ ইন"}
            </Button>
            <Button onClick={() => router.push("/register")}>{language === "en" ? "Sign up" : "সাইন আপ"}</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {content.title}
                  <br />
                  {content.subtitle}
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {content.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-1" onClick={() => router.push("/register")}>
                  <Zap className="h-4 w-4" />
                  <span>{content.getStarted}</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-1"
                  onClick={() => router.push("/api/auth/signin?provider=github")}
                >
                  <Github className="h-4 w-4" />
                  <span>{content.continueWithGithub}</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en" ? "Powerful Features" : "শক্তিশালী বৈশিষ্ট্য"}
                </h2>
                <p
                  className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en"
                    ? "Everything you need to build amazing applications, presentations, and prototypes."
                    : "অসাধারণ অ্যাপ্লিকেশন, প্রেজেন্টেশন এবং প্রোটোটাইপ তৈরি করতে আপনার যা প্রয়োজন তার সবকিছু।"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{content.features.editor}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Code faster with AI-powered suggestions and completions."
                      : "AI-চালিত পরামর্শ এবং সম্পূর্ণতার সাথে দ্রুত কোড করুন।"}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MobileIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{content.features.mobile}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Code on the go with our responsive mobile interface."
                      : "আমাদের প্রতিক্রিয়াশীল মোবাইল ইন্টারফেস দিয়ে চলতে চলতে কোড করুন।"}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{content.features.github}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Seamless GitHub integration for version control and collaboration."
                      : "ভার্সন কন্ট্রোলের জন্য নিরবচ্ছিন্ন GitHub ইন্টিগ্রেশন।"}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{content.features.multilingual}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Full support for multiple languages including Bengali."
                      : "বাংলা সহ একাধিক ভাষার জন্য সম্পূর্ণ সমর্থন।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="presentations" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en" ? "Interactive Presentations" : "ইন্টারেক্টিভ প্রেজেন্টেশন"}
                </h2>
                <p
                  className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en"
                    ? "Create engaging presentations with interactive elements and animations."
                    : "ইন্টারেক্টিভ উপাদান এবং অ্যানিমেশন সহ আকর্ষণীয় প্রেজেন্টেশন তৈরি করুন।"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PresentationIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{language === "en" ? "Slide Deck Creator" : "স্লাইড ডেক ক্রিয়েটর"}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Build beautiful slide decks with our intuitive editor."
                      : "আমাদের সহজবোধ্য এডিটর দিয়ে সুন্দর স্লাইড ডেক তৈরি করুন।"}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LayoutIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{language === "en" ? "Interactive Elements" : "ইন্টারেক্টিভ উপাদান"}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Add interactive elements like quizzes and polls to engage your audience."
                      : "আপনার দর্শকদের আকৃষ্ট করতে কুইজ এবং পোল যেমন ইন্টারেক্টিভ উপাদান যোগ করুন।"}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{language === "en" ? "Export Options" : "এক্সপোর্ট অপশন"}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Export your presentations as PDF, HTML, or interactive web pages."
                      : "আপনার প্রেজেন্টেশনগুলি PDF, HTML, বা ইন্টারেক্টিভ ওয়েব পেজ হিসাবে এক্সপোর্ট করুন।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="prototypes" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en" ? "Multi-device Prototypes" : "মাল্টি-ডিভাইস প্রোটোটাইপ"}
                </h2>
                <p
                  className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en"
                    ? "Design and test prototypes for multiple devices and screen sizes."
                    : "একাধিক ডিভাইস এবং স্ক্রিন সাইজের জন্য প্রোটোটাইপ ডিজাইন এবং পরীক্ষা করুন।"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{language === "en" ? "Responsive Design" : "রেসপনসিভ ডিজাইন"}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Create designs that work seamlessly across all screen sizes."
                      : "সমস্ত স্ক্রিন সাইজে নিরবচ্ছিন্নভাবে কাজ করে এমন ডিজাইন তৈরি করুন।"}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PencilIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {language === "en" ? "Interactive Wireframes" : "ইন্টারেক্টিভ ওয়্যারফ্রেম"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Build interactive wireframes to test user flows and interactions."
                      : "ব্যবহারকারী প্রবাহ এবং ইন্টারঅ্যাকশন পরীক্ষা করতে ইন্টারেক্টিভ ওয়্যারফ্রেম তৈরি করুন।"}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MobileIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{language === "en" ? "Device Preview" : "ডিভাইস প্রিভিউ"}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Preview your designs on different devices in real-time."
                      : "রিয়েল-টাইমে বিভিন্ন ডিভাইসে আপনার ডিজাইন প্রিভিউ করুন।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en" ? "Pre-built Templates" : "প্রি-বিল্ট টেমপ্লেট"}
                </h2>
                <p
                  className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl ${language === "bn" ? "font-bangla" : ""}`}
                >
                  {language === "en"
                    ? "Get started quickly with our library of pre-built templates."
                    : "আমাদের প্রি-বিল্ট টেমপ্লেটের লাইব্রেরি দিয়ে দ্রুত শুরু করুন।"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <PresentationIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {language === "en" ? "Presentation Templates" : "প্রেজেন্টেশন টেমপ্লেট"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Professional presentation templates for business, education, and more."
                      : "ব্যবসা, শিক্ষা এবং আরও অনেক কিছুর জন্য পেশাদার প্রেজেন্টেশন টেমপ্লেট।"}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <LayoutIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {language === "en" ? "Prototype Templates" : "প্রোটোটাইপ টেমপ্লেট"}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Start with pre-built prototype templates for web and mobile apps."
                      : "ওয়েব এবং মোবাইল অ্যাপের জন্য প্রি-বিল্ট প্রোটোটাইপ টেমপ্লেট দিয়ে শুরু করুন।"}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{language === "en" ? "Code Templates" : "কোড টেমপ্লেট"}</h3>
                  <p className="text-muted-foreground text-center">
                    {language === "en"
                      ? "Code snippets and templates for common programming tasks."
                      : "সাধারণ প্রোগ্রামিং কাজের জন্য কোড স্নিপেট এবং টেমপ্লেট।"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/20 to-accent/20 text-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${language === "bn" ? "font-bangla" : ""}`}
              >
                {language === "en" ? "Ready to Get Started?" : "শুরু করতে প্রস্তুত?"}
              </h2>
              <p
                className={`mx-auto max-w-[700px] text-muted-foreground md:text-xl ${language === "bn" ? "font-bangla" : ""}`}
              >
                {language === "en"
                  ? "Join thousands of users who have transformed their workflow with OctaActions."
                  : "হাজার হাজার ব্যবহারকারীদের সাথে যোগ দিন যারা অক্টাঅ্যাকশনস দিয়ে তাদের ওয়ার্কফ্লো পরিবর্তন করেছে।"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="rounded-full h-12 px-8 text-base" onClick={() => router.push("/register")}>
                  {language === "en" ? "Get Started Free" : "বিনামূল্যে শুরু করুন"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base"
                  onClick={() => router.push("/api/auth/signin?provider=github")}
                >
                  <Github className="mr-2 h-5 w-5" />
                  {language === "en" ? "Continue with GitHub" : "GitHub দিয়ে চালিয়ে যান"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {language === "en"
                  ? "No credit card required. Free to get started."
                  : "ক্রেডিট কার্ড প্রয়োজন নেই। শুরু করতে বিনামূল্যে।"}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Code className="h-4 w-4 text-primary-foreground" />
                </div>
                <span>OctaActions</span>
              </div>
              <p className={`text-sm text-muted-foreground ${language === "bn" ? "font-bangla" : ""}`}>
                {language === "en"
                  ? "A modern browser-based platform for code editing, presentations, and prototyping."
                  : "কোড এডিটিং, প্রেজেন্টেশন এবং প্রোটোটাইপিংয়ের জন্য একটি আধুনিক ব্রাউজার-ভিত্তিক প্ল্যাটফর্ম।"}
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="size-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">{language === "en" ? "Product" : "পণ্য"}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Features" : "বৈশিষ্ট্য"}
                  </Link>
                </li>
                <li>
                  <Link href="#presentations" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Presentations" : "প্রেজেন্টেশন"}
                  </Link>
                </li>
                <li>
                  <Link href="#prototypes" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Prototypes" : "প্রোটোটাইপ"}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">{language === "en" ? "Resources" : "রিসোর্স"}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Documentation" : "ডকুমেন্টেশন"}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Guides" : "গাইড"}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Blog" : "ব্লগ"}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">{language === "en" ? "Company" : "কোম্পানি"}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "About" : "সম্পর্কে"}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Privacy Policy" : "গোপনীয়তা নীতি"}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {language === "en" ? "Terms of Service" : "সেবার শর্তাবলী"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} OctaActions.{" "}
              {language === "en" ? "All rights reserved." : "সর্বস্বত্ব সংরক্ষিত।"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

