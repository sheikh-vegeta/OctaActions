"use client";

import React from "react";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Check if analytics is enabled using client-side environment variables
  const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
  
  return (
    <>
      {children}
      {analyticsEnabled && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
