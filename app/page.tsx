"use client";

import { SearchIcon, UsersIcon, MailIcon } from "lucide-react"
import { NavBar } from "@/components/navbar"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Is Professionhall?</h2>
                <p className="text-gray-500 md:text-lg dark:text-gray-400">
                  Professionhall is WozWize's curated talent bench—a simple, searchable showcase of available engineers ready for contract, C2C, or full-time work.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <SearchIcon className="h-6 w-6 text-primary" />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Search by Skill</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use keyword search to find engineers with the tech stack you need—Java, Python, React, and more.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <UsersIcon className="h-6 w-6 text-primary" />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Browse the Bench</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Every profile is vetted and maintained by WozWize. No fluff, no dead links—just people who can ship.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <MailIcon className="h-6 w-6 text-primary" />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Contact to Hire</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    See someone that fits?
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact Us directly to get resumes, availability, and contract terms.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

