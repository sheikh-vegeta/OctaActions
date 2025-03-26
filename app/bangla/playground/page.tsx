"use client"

import { ModelPlayground } from "@/components/ai/model-playground"

export default function BanglaPlaygroundPage() {
  return (
    <div className="container mx-auto py-10 font-bangla">
      <h1 className="text-3xl font-bold mb-6">দোয়েল এআই মডেল প্লেগ্রাউন্ড</h1>
      <p className="text-muted-foreground mb-8">
        ওপেনএআই, এনভিডিআই, হাগিংফেস এবং ওপেনরাউটার সহ বিভিন্ন প্রদানকারীর বিভিন্ন এআই মডেলের সাথে পরীক্ষা করুন।
      </p>
      <ModelPlayground />
    </div>
  )
}
