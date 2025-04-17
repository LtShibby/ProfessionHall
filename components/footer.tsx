"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="w-full bg-card text-card-foreground border-t">
      <div className="ph-gradient h-1" />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left Side: Text Content */}
          <div className="text-center md:text-left space-y-2">
            <Link href="/" className="text-xl font-bold">
              ProfessionHall
            </Link>
            <p className="text-sm text-muted-foreground">
              A product of{" "}
              <Link href="https://wozwize.com" className="underline hover:text-primary">
                WozWize
              </Link>.
            </p>
            <p className="text-sm text-muted-foreground">
              Curated engineers. No fluff. Just people who ship.
            </p>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex space-x-4">
            <Link href="https://x.com/WozWize" className="text-muted-foreground hover:text-primary transition">
              <FaXTwitter size={20} />
            </Link>
            <Link href="https://linkedin.com/in/matthew-wozniak/" className="text-muted-foreground hover:text-primary transition">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ProfessionHall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
