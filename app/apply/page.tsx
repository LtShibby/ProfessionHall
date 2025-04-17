"use client"

import { NavBar } from "@/components/navbar"

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Sticky NavBar */}
      <div className="sticky top-0 z-20 bg-background shadow-sm">
        <NavBar />
      </div>

      <main className="flex-1">
        <div className="min-h-[calc(100vh-5rem)] p-8 pt-12">
          <div className="max-w-6xl mx-auto">
            {/* Banner */}
            <div className="relative w-full h-[300px] mb-12 rounded-lg overflow-hidden">
              <img
                src="/images/talent-pool-banner.jpg"
                alt="Apply to the ProfessionHall Talent Pool"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold text-center font-['Fira_Code'] px-4">
                  Join the ProfessionHall Talent Pool
                </h1>
              </div>
            </div>

            {/* Description */}
            <p className="text-center mb-12 text-lg text-muted-foreground max-w-3xl mx-auto">
              This form feeds directly into the WozWize engineering bench. Apply once, get matched when the right role comes.
            </p>

            {/* Embedded Google Form */}
            <div className="flex justify-center">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSewfkg_sGZFyf51mRYymFsk7we79xSQ-xOPifwMtvV6JJATRA/viewform?embedded=true"
                width="100%"
                height="1000"
                className="max-w-4xl"
                aria-label="ProfessionHall Talent Pool Application"
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
