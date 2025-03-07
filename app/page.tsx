import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon, Code2Icon, SearchIcon, DollarSignIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    See real work.
                    <br />
                    <hr/>
                    Hire real talent.
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    ProfessionHall connects professionals with companies through real projects, portfolios, and work samples.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup?type=engineer">
                    <Button size="lg" className="w-full">
                      <GithubIcon className="mr-2 h-4 w-4" />
                      Join as Engineer
                    </Button>
                  </Link>
                  <Link href="/signup?type=recruiter">
                    <Button size="lg" variant="outline" className="w-full">
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Join as Recruiter
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="aspect-video overflow-hidden rounded-xl border bg-gray-100 dark:bg-gray-800">
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt="Platform preview"
                    width={1280}
                    height={720}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How ProfessionHall Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform helps professionals showcase their work and connects them with companies looking for talent.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <Code2Icon className="h-6 w-6 text-primary" />
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
              {/* <div className="flex flex-col items-center space-y-2 p-6 bg-white shadow-sm rounded-lg dark:bg-gray-950">
                <DollarSignIcon className="h-6 w-6 text-primary" />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Company Discovery</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recruiters filter and find professionals based on actual projects and skills.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

