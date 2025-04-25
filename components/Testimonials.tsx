"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedPlacementCount } from "./AnimatedPlacementCount"

const candidateTestimonials = [
  {
    name: "Marcus B.",
    role: "Cloud Infrastructure Engineer",
    industry: "Enterprise SaaS",
    image: "/testimonials/marcus.jpg",
    quote: "ProfessionHall connected me with a great opportunity where I'm now architecting multi-region AWS environments and scaling infrastructure for enterprise clients.",
    initials: "MB"
  },
  {
    name: "Alina C.",
    role: "Full Stack Developer",
    industry: "E-commerce",
    image: "/testimonials/alina.jpg",
    quote: "Using ProfessionHall made all the difference. Instead of just another resume drop, they highlighted my real project work and that's what got me hired.",
    initials: "AC"
  },
  {
    name: "Devin P.",
    role: "Machine Learning Engineer",
    industry: "HealthTech",
    image: "/testimonials/dev.jpg",
    quote: "ProfessionHall's project-first approach gave me a real advantage. It let me show what I could actually build, not just what I could memorize for an interview.",
    initials: "DP"
  },
  {
    name: "Lena W.",
    role: "Front-End Engineer",
    industry: "EdTech",
    image: "/testimonials/lena.jpg",
    quote: "ProfessionHall didn't just get me a job it got me seen. My portfolio finally stood out, and the company that hired me said it was the real projects that made the decision easy.",
    initials: "LW"
  },
  {
    name: "Carlos M.",
    role: "DevOps Engineer",
    industry: "FinTech",
    image: "/testimonials/carlos.jpg",
    quote: "After months of rejection, ProfessionHall was a turning point. Within two weeks, I had interviews lined up. Now I'm leading CI/CD rollout at a fintech startup.",
    initials: "CM"
  },
  {
    name: "Neha K.",
    role: "Data Scientist",
    industry: "Retail Analytics",
    image: "/testimonials/neha.jpg",
    quote: "I'd never seen a platform so focused on actual work. ProfessionHall helped me tell a better story and that story landed me my current role.",
    initials: "NK"
  },
  {
    name: "Aaron T.",
    role: "Software Engineer",
    industry: "Cybersecurity",
    image: "/testimonials/aaron.jpg",
    quote: "Matt's interview was no joke. I walked out thinking I blew it. But he gave honest feedback, and a week later I got an offer from the company I didn't think would even look at me. Game-changing experience.",
    initials: "AT"
  },
  {
    name: "Jasmine L.",
    role: "AI Product Engineer",
    industry: "Artificial Intelligence",
    image: "/testimonials/jasmine.jpg",
    quote: "The interview with Matt was tough but in the best way. He pushed me to think, challenged my assumptions, and made me a better engineer. That session alone was worth more than three bootcamps.",
    initials: "JL"
  },
  {
    name: "Tanya V.",
    role: "Backend Developer",
    industry: "Financial Services",
    image: "/testimonials/tanya.jpg",
    quote: "I almost didn't apply because I thought I wasn't ready. Matt's message was blunt but supportive 'Show your work. Let them judge you for that.' I did. It worked.",
    initials: "TV"
  }
]

const recruiterTestimonials = [
  {
    name: "Sandra K.",
    role: "Tech Recruiting Lead",
    industry: "Startup Recruitment",
    image: "/testimonials/sandra.jpg",
    quote: "I initially reached out to Matt about a role and he pitched this website to me instead. I thought it was some kind of bait and switch but I ended up finding a candidate perfect for the role. Matt set up the intro, the guy nailed the interview, and the hiring manager didn't even want to see anyone else.",
    initials: "SK"
  },
  {
    name: "Rachel P.",
    role: "Technical Recruiter",
    industry: "Staffing & Recruiting",
    image: "/testimonials/rachel.jpg",
    quote: "Matt isn't just vetting candidates, he's leveling them up. Every engineer he screens walks away better prepared, and every hire he endorses has been rock solid. I trust his judgment more than most hiring panels.",
    initials: "RP"
  },
  {
    name: "Darnell S.",
    role: "Senior Talent Partner",
    industry: "Enterprise IT Staffing",
    image: "/testimonials/darnell.jpg",
    quote: "Working with Matt through ProfessionHall has been a recruiter's dream. He asks the right questions, gives unfiltered feedback, and doesn't waste time. The candidates he greenlights move fast and stay hired.",
    initials: "DS"
  },
  {
    name: "Bryce H.",
    role: "Staffing Consultant",
    industry: "Tech Consulting",
    image: "/testimonials/bryce.jpg",
    quote: "Matt's screening process is sharper than most CTOs I've worked with. He doesn't just pass along resumes, he sends people who've already been through fire. When he says 'this one's ready,' I know they are.",
    initials: "BH"
  },
  {
    name: "Imani J.",
    role: "Recruiting Manager",
    industry: "Corporate Talent Acquisition",
    image: "/testimonials/imani.jpg",
    quote: "The thing about working with Matt is he doesn't just understand engineers, he is one. That makes all the difference. The quality of candidates coming out of ProfessionHall has saved us time, budget, and frankly, a lot of post-hire regret.",
    initials: "IJ"
  }
]

const SCROLL_SPEED = 0.5 // pixels per frame
const PLACEMENT_COUNT = 17
const RECRUITER_COUNT = 10

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)
  const [showRecruiters, setShowRecruiters] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  const testimonials = showRecruiters ? recruiterTestimonials : candidateTestimonials

  const scroll = () => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const cardWidth = 400 // max-width of each card
    const totalWidth = cardWidth * testimonials.length

    if (!isPaused) {
      // Reset scroll position when reaching the end of the first set
      if (container.scrollLeft >= totalWidth) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft += SCROLL_SPEED
      }
    }

    animationRef.current = requestAnimationFrame(scroll)
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(scroll)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, showRecruiters])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              <motion.h2
                key={showRecruiters ? "recruiter" : "candidate"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                {showRecruiters ? "Recruiter Stories" : "Candidate Stories"}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {showRecruiters ? (
                <AnimatedPlacementCount 
                  key="recruiter" 
                  count={RECRUITER_COUNT} 
                  label="Recruiters Sourced Talent" 
                />
              ) : (
                <AnimatedPlacementCount 
                  key="candidates" 
                  count={PLACEMENT_COUNT} 
                  label="Candidates Placed" 
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={showRecruiters ? "recruiter-desc" : "candidate-desc"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                {showRecruiters
                  ? "See how ProfessionHall helped recruiters discover and close top engineering talent."
                  : "See how ProfessionHall has helped talented professionals find their dream roles"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <Label htmlFor="testimonial-toggle" className="text-sm font-medium">
            Candidate Stories
          </Label>
          <Switch
            id="testimonial-toggle"
            checked={showRecruiters}
            onCheckedChange={setShowRecruiters}
          />
          <Label htmlFor="testimonial-toggle" className="text-sm font-medium">
            Recruiter Stories
          </Label>
        </div>

        <div 
          ref={containerRef}
          className="relative mt-8 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={scrollRef}
            className="flex overflow-x-scroll no-scrollbar whitespace-nowrap"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index} 
                className="min-w-[300px] max-w-[400px] flex-shrink-0 px-4"
              >
                <Card className="flex flex-col h-full">
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <blockquote className="text-lg font-semibold leading-snug tracking-tight whitespace-normal">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.industry}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 