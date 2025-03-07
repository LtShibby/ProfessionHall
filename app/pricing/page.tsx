import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
            <span className="font-bold text-xl">ProfessionHall</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm font-medium hover:underline">
              How It Works
            </Link>
            <Link href="/for-engineers" className="text-sm font-medium hover:underline">
              For Professionals
            </Link>
            <Link href="/for-companies" className="text-sm font-medium hover:underline">
              For Companies
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Choose the plan that's right for you or your company.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-8 mt-8">
                {/* Engineer Plans */}
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>Perfect for professionals looking to showcase their work</CardDescription>
                    <div className="mt-4 text-4xl font-bold">$0</div>
                    <p className="text-sm text-muted-foreground">Forever free</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Basic profile</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Link up to 3 GitHub repositories</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Basic skills analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Limited job matches</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/signup?type=engineer&plan=free" className="w-full">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-sm border-primary">
                  <CardHeader>
                    <div className="absolute top-0 right-0 transform -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                      Popular
                    </div>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For serious professionals who want maximum visibility</CardDescription>
                    <div className="mt-4 text-4xl font-bold">$12</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Enhanced profile with custom sections</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Unlimited GitHub repositories</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Advanced AI skills analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Priority in recruiter searches</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Unlimited job matches</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Profile analytics and insights</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/signup?type=engineer&plan=pro" className="w-full">
                      <Button className="w-full">Upgrade to Pro</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-sm">
                  <CardHeader>
                    <CardTitle>Recruiter</CardTitle>
                    <CardDescription>For companies looking to hire top engineering talent</CardDescription>
                    <div className="mt-4 text-4xl font-bold">$199</div>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Advanced search filters</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Unlimited engineer profile views</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Direct contact with engineers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>AI-powered candidate matching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Team collaboration features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span>Hiring analytics dashboard</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/signup?type=recruiter&plan=standard" className="w-full">
                      <Button className="w-full">Start Recruiting</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Answers to common questions about our platform and pricing.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:gap-12 mt-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">How does the hiring process work?</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Recruiters can search for engineers based on skills, projects, and experience. When they find a
                    match, they can contact the engineer directly through our platform to start the conversation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Do you charge hiring fees?</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    No, we don't charge any additional hiring fees. Companies pay a flat monthly subscription for
                    unlimited access to our platform and can hire as many engineers as they want.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">How is this different from LinkedIn?</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Unlike LinkedIn, we focus exclusively on engineers and their actual work. Our platform analyzes
                    GitHub repositories, projects, and contributions to create a comprehensive skills profile that goes
                    beyond self-reported skills.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Can I cancel my subscription anytime?</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation
                    fees. Your subscription will remain active until the end of your current billing period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col gap-4 md:h-16 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 ProfessionHall. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

