"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code, Github, Layers, SmartphoneIcon as MobileIcon, Sparkles, Zap } from "lucide-react"

export default function BanglaPage() {
  return (
    <div className="flex min-h-screen flex-col font-bangla">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">OctaActions</span>
            <span className="text-sm text-muted-foreground">দোয়েল দ্বারা চালিত</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium">
              বৈশিষ্ট্য
            </Link>
            <Link href="#pricing" className="text-sm font-medium">
              মূল্য
            </Link>
            <Link href="/bangla/playground" className="text-sm font-medium">
              এআই প্লেগ্রাউন্ড
            </Link>
            <Link href="#about" className="text-sm font-medium">
              সম্পর্কে
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline">English</Button>
            </Link>
            <ThemeToggle />
            <Button variant="outline">লগ ইন</Button>
            <Button>সাইন আপ</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  ডিজাইন, কোড, ডেপ্লয়।
                  <br />
                  সবকিছু একটি প্ল্যাটফর্মে।
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  অক্টাঅ্যাকশনস আপনাকে দ্রুত উন্নত সফটওয়্যার তৈরি করতে সাহায্য করার জন্য AI এর শক্তিকে একটি আধুনিক কোড এডিটরের সাথে সংযুক্ত
                  করে। AI দিয়ে ডিজাইন করুন, আত্মবিশ্বাসের সাথে কোড করুন এবং বিনা ঝামেলায় ডেপ্লয় করুন।
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-1">
                  <Zap className="h-4 w-4" />
                  <span>বিনামূল্যে শুরু করুন</span>
                </Button>
                <Button size="lg" variant="outline" className="gap-1">
                  <Github className="h-4 w-4" />
                  <span>GitHub দিয়ে চালিয়ে যান</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">শক্তিশালী বৈশিষ্ট্য</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  অসাধারণ অ্যাপ্লিকেশন তৈরি করতে আপনার যা প্রয়োজন তার সবকিছু।
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-পাওয়ার্ড এডিটর</h3>
                  <p className="text-muted-foreground text-center">AI-চালিত পরামর্শ এবং সম্পূর্ণতার সাথে দ্রুত কোড করুন।</p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <MobileIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">মোবাইল সাপোর্ট</h3>
                  <p className="text-muted-foreground text-center">
                    আমাদের প্রতিক্রিয়াশীল মোবাইল ইন্টারফেস দিয়ে চলতে চলতে কোড করুন।
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">GitHub ইন্টিগ্রেশন</h3>
                  <p className="text-muted-foreground text-center">ভার্সন কন্ট্রোলের জন্য নিরবচ্ছিন্ন GitHub ইন্টিগ্রেশন।</p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">বহুভাষিক সমর্থন</h3>
                  <p className="text-muted-foreground text-center">বাংলা সহ একাধিক ভাষার জন্য সম্পূর্ণ সমর্থন।</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">শিক্ষামূলক প্ল্যাটফর্ম</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  বাংলা ভাষায় কৃত্রিম বুদ্ধিমত্তা ভিত্তিক শিক্ষামূলক প্ল্যাটফর্ম
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold">সাধারণ জ্ঞান</h3>
                  <p className="text-muted-foreground text-center">
                    জানুন সাধারণ জ্ঞান বিষয়ক বিভিন্ন প্রশ্নের উত্তর কথন AI এর কাছ থেকে
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold">বাংলা ভাষায় সকল উত্তর</h3>
                  <p className="text-muted-foreground text-center">
                    কথন AI আপনাকে দেবে সকল প্রশ্নের উত্তর সহজ বাংলা ভাষায় মুহূর্তের মধ্যে
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-background rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold">টেকনিক্যাল মাস্টার</h3>
                  <p className="text-muted-foreground text-center">বিজ্ঞান ও পোগ্রামিং এর সকল উত্তরগুলো পান অনেক সহজ ভাষায়</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground"> 2024 OctaActions. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              শর্তাবলী
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              গোপনীয়তা
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              যোগাযোগ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
