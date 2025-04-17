"use client"

import Link from "next/link"
import { Menu, SearchIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function NavBar() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">ProfessionHall</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/apply" className="text-sm font-medium hover:text-primary transition-colors">
            Join the Talent Pool
          </Link>
          <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
            Find Talent
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/apply" className="text-base font-medium hover:text-primary transition-colors">
                  Join the Talent Pool
                </Link>
                <Link href="/search" className="text-base font-medium hover:text-primary transition-colors">
                  Find Talent
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
