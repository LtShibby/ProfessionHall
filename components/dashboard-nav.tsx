"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboardIcon, UserIcon, SettingsIcon, LogOutIcon } from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">ProfessionHall</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-1">
              <LayoutDashboardIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            href="/dashboard/profile"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard/profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              <span>Profile</span>
            </div>
          </Link>
          <Link
            href="/dashboard/settings"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard/settings" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-1">
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

