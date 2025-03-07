"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, SearchIcon } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">ProfessionHall</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
              Find Talent
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="hover:text-primary">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[0.8fr_800px]">
              <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    See real work.
                    <br />
                    <div className="h-1 w-32 bg-gradient-to-r from-primary to-transparent my-4" />
                    Hire real talent.
                  </h1>
                  <p className="text-base sm:text-lg text-gray-500 md:text-xl dark:text-gray-400">
                    ProfessionHall connects professionals with companies through real projects, portfolios, and work samples.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/signup?type=engineer" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                      <GithubIcon className="mr-2 h-4 w-4" />
                      Join as Engineer
                    </Button>
                  </Link>
                  <Link href="/signup?type=recruiter" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full hover:text-primary">
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Join as Recruiter
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto w-full lg:ml-auto order-1 lg:order-2">
                <div className="aspect-video rounded-xl border bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src="/professionHallBanner.jpg?height=720&width=1280"
                    alt="Platform preview"
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-[800px] mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How ProfessionHall Works</h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Our platform helps professionals showcase their work and connects them with companies looking for talent.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <GithubIcon className="h-6 w-6 text-primary" />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Showcase Your Work</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Link portfolios, upload projects, and showcase your real work.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Skill Mapping</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    AI scans your profile and projects to map skills dynamically.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <SearchIcon className="h-6 w-6 text-primary" />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Smart Matching</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quick surveys match professionals with companies based on work style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

