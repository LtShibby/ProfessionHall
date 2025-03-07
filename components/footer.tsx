"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme } = useTheme();
  
  const themeClasses = {
    nav: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-white' : 'text-gray-800',
    button: theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
  };
  
  return (
    <footer className={`w-full ${themeClasses.nav} ${themeClasses.text} py-6 text-center text-sm mt-auto`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()}{" "}
          <Link 
            href="https://wozwize.com"
            className={`${themeClasses.button} px-2 py-1 rounded hover:opacity-90 transition`}
          >
            WozWize
          </Link>
          . All Rights Reserved.
        </p>
        
        <div className="flex space-x-4">
          <Link 
            href="https://wozwize.com/privacy-policy"
            className="hover:opacity-80 transition"
          >
            Privacy Policy
          </Link>
          <Link 
            href="https://wozwize.com/terms-of-service"
            className="hover:opacity-80 transition"
          >
            Terms of Service
          </Link>
          <Link 
            href="https://wozwize.com/about-us"
            className="hover:opacity-80 transition"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 