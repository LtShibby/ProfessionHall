"use client"

import { NavBar } from "@/components/navbar"

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Apply to the ProfessionHall Talent Pool
            </h1>
            <p className="text-lg text-muted-foreground">
              This form feeds directly into the ProfessionHall engineering bench. Apply once, get matched when the right role comes.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4 md:p-6">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSewfkg_sGZFyf51mRYymFsk7we79xSQ-xOPifwMtvV6JJATRA/viewform?embedded=true"
                width="100%"
                height="3600"
                className="min-h-[3600px] w-full border-0"
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 