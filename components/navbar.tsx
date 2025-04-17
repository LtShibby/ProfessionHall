"use client"

import Link from "next/link"
import { SearchIcon } from "lucide-react"

export function NavBar() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">ProfessionHall</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/apply" className="text-sm font-medium hover:text-primary transition-colors">
            Join the Talent Pool
          </Link>
          <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
            Find Talent
          </Link>
        </nav>
      </div>
    </header>
  )
} 