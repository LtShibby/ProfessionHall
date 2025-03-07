import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CalendarIcon, 
  GithubIcon, 
  BarChart3, 
  Users, 
  Briefcase, 
  Code2 
} from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

export const metadata: Metadata = {
  title: "Dashboard | ProfessionHall",
  description: "Manage your professional portfolio and track your progress",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/profile">
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Project Views</CardTitle>
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">+24% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recruiter Contacts</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">Add 2 more projects to reach 100%</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Profile Activity</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    Activity chart will appear here
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your profile and project activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-2 space-y-1">
                        <p className="text-sm font-medium leading-none">Profile viewed by TechCorp</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <GithubIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-2 space-y-1">
                        <p className="text-sm font-medium leading-none">New GitHub project synced</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 3:45 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-2 space-y-1">
                        <p className="text-sm font-medium leading-none">New job opportunity match</p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>E-commerce API</CardTitle>
                  <div className="flex items-center space-x-2">
                    <GithubIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                      <Code2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        A RESTful API for e-commerce platforms built with Node.js and Express
                      </p>
                      <div className="flex flex-wrap gap-1 pt-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-200">
                          Node.js
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/30 dark:text-green-200">
                          Express
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/30 dark:text-purple-200">
                          MongoDB
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Weather Dashboard</CardTitle>
                  <div className="flex items-center space-x-2">
                    <GithubIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                      <Code2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        A React-based weather dashboard with real-time data visualization
                      </p>
                      <div className="flex flex-wrap gap-1 pt-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-200">
                          React
                        </span>
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10 dark:bg-yellow-900/30 dark:text-yellow-200">
                          JavaScript
                        </span>
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10 dark:bg-red-900/30 dark:text-red-200">
                          D3.js
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Task Management App</CardTitle>
                  <div className="flex items-center space-x-2">
                    <GithubIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-[120px] w-full bg-muted rounded-md flex items-center justify-center">
                      <Code2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        A full-stack task management application with real-time updates
                      </p>
                      <div className="flex flex-wrap gap-1 pt-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-200">
                          Next.js
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/30 dark:text-green-200">
                          TypeScript
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/30 dark:text-purple-200">
                          Prisma
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button>
                <GithubIcon className="mr-2 h-4 w-4" />
                Connect GitHub Repository
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills Analysis</CardTitle>
                <CardDescription>
                  AI-powered analysis of your skills based on your projects and GitHub activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">JavaScript</div>
                      <div className="text-sm text-muted-foreground">Advanced</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">React</div>
                      <div className="text-sm text-muted-foreground">Intermediate</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Node.js</div>
                      <div className="text-sm text-muted-foreground">Advanced</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "80%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">TypeScript</div>
                      <div className="text-sm text-muted-foreground">Intermediate</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">MongoDB</div>
                      <div className="text-sm text-muted-foreground">Intermediate</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Opportunities</CardTitle>
                <CardDescription>Matched based on your skills and project experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Senior Frontend Developer</h3>
                        <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">Looking for a React expert with TypeScript experience to join our team.</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-200">
                          React
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/30 dark:text-green-200">
                          TypeScript
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/30 dark:text-purple-200">
                          Redux
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium">Match score:</span> 92%
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">Full Stack Developer</h3>
                        <p className="text-sm text-muted-foreground">Innovate Solutions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        Seeking a developer with Node.js and React experience for our growing team.
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-200">
                          Node.js
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/30 dark:text-green-200">
                          React
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/30 dark:text-purple-200">
                          MongoDB
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium">Match score:</span> 85%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

