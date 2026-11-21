import React from 'react'
import { Ripple } from "@/components/ui/ripple"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0">
        <Ripple numCircles={14}/>
      </div>
      {children}
    </main>
  );
}
