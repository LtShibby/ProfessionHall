"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronRight } from "lucide-react";

export function FilterSection({
  skills,
  selectedSkills,
  toggleSkill,
  locationFilter,
  setLocationFilter,
  experienceFilter,
  setExperienceFilter,
  workAuthFilter,
  setWorkAuthFilter,
  availabilityFilter,
  setAvailabilityFilter,
  willingToRelocateFilter,
  setWillingToRelocateFilter,
  locationSuggestions,
  fetchLocationSuggestions,
  prefix,
}: {
  skills: string[];
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  experienceFilter: string;
  setExperienceFilter: (value: string) => void;
  workAuthFilter: string;
  setWorkAuthFilter: (value: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (value: string) => void;
  willingToRelocateFilter: string;
  setWillingToRelocateFilter: (value: string) => void;
  locationSuggestions: string[]
  fetchLocationSuggestions: (value: string) => void
  prefix: string;
}) {
  const [skillSearch] = useState("");

  const [skillsVisible, setSkillsVisible] = useState(false);

  const categorizedSkills: Record<string, string[]> = {
    "Front End": [
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "CSS/SCSS",
      "Tailwind CSS",
      "UI/UX Design",
      "Storybook",
    ],
    "Back End": [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "Flask",
      "Java",
      "Spring Boot",
      "Go",
      "Ruby on Rails",
      "PHP",
    ],
    "DevOps / Infra": [
      "AWS",
      "GCP",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Terraform",
    ],
    "Data / Storage": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "GraphQL",
    ],
    "Data Science / ML": [
      "Pandas",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Airflow",
      "Spark",
    ],
    "Other Skills": [
      "REST API Design",
      "TDD / Unit Testing",
      "Git / GitHub",
      "Agile / Scrum",
      "System Design",
      "Microservices Architecture",
      "Team Management",  
      "Project Leadership",
      "Client Relations",
      "Strategic Planning",
      "Web Development Oversight",
    ],
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-md p-3 space-y-2 bg-background shadow-sm">
        <button
          className="flex items-center justify-between w-full text-sm font-medium leading-none"
          onClick={() => setSkillsVisible(!skillsVisible)}
        >
          <span>Skills</span>
          {skillsVisible ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {skillsVisible && (
          <div className="border rounded-md p-3 bg-muted/10 space-y-2">
            <Accordion type="multiple" className="w-full">
              {Object.entries(categorizedSkills).map(([category, items]) => {
                const filteredItems = items.filter((skill) =>
                  skill.toLowerCase().includes(skillSearch.toLowerCase())
                );
                if (filteredItems.length === 0) return null;
                return (
                  <AccordionItem value={category} key={category}>
                    <AccordionTrigger className="text-sm font-medium text-left">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {filteredItems.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${prefix}-skill-${skill}`}
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={() => toggleSkill(skill)}
                            />
                            <Label htmlFor={`${prefix}-skill-${skill}`}>
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Minimum Experience (years)</h3>
        <Input
          type="number"
          placeholder="Years of experience"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Work Authorization</h3>
        <Select value={workAuthFilter} onValueChange={setWorkAuthFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select authorization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="U.S. Citizen">U.S. Citizen</SelectItem>
            <SelectItem value="U.S. Green Card Holder (Permanent Resident)">U.S. Green Card Holder (Permanent Resident)</SelectItem>
            <SelectItem value="H-1B Visa Holder">H-1B Visa Holder</SelectItem>
            <SelectItem value="F-1 OPT / CPT">F-1 OPT / CPT</SelectItem>
            <SelectItem value="TN Visa">TN Visa</SelectItem>
            <SelectItem value="Singapore Citizen">Singapore Citizen</SelectItem>
            <SelectItem value="Authorized to work in Singapore">Authorized to work in Singapore</SelectItem>
            <SelectItem value="Authorized to work in the U.S.">Authorized to work in the U.S.</SelectItem>
            <SelectItem value="Authorized to work in Canada">Authorized to work in Canada</SelectItem>
            <SelectItem value="Indonesia Citizen">Indonesia Citizen</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Availability Type</h3>
        <Select
          value={availabilityFilter}
          onValueChange={setAvailabilityFilter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 relative">
        <h3 className="text-sm font-medium">Location</h3>
        <Input
          placeholder="Filter by location"
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value)
            fetchLocationSuggestions(e.target.value)
          }}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Willing to Relocate</h3>
        <Select
          value={willingToRelocateFilter}
          onValueChange={setWillingToRelocateFilter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select willingness" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
            <SelectItem value="Maybe">Maybe</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
