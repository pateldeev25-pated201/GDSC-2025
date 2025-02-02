"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import JobPostingCard from "@/components/JobPostingCard"

interface JobPosting {
  id: string
  title: string
  description: string
  keySkills: string[]
}

export default function HomePage() {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [keySkills, setKeySkills] = useState("")
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newJobPosting: JobPosting = {
      id: Date.now().toString(),
      title: jobTitle,
      description: jobDescription,
      keySkills: keySkills.split(",").map((skill) => skill.trim()),
    }
    setJobPostings([...jobPostings, newJobPosting])
    setJobTitle("")
    setJobDescription("")
    setKeySkills("")
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold mb-4">Create Job Posting</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <Input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              className="mt-1"
              rows={4}
            />
          </div>
          <div>
            <label htmlFor="keySkills" className="block text-sm font-medium text-gray-700">
              Key Skills (comma-separated)
            </label>
            <Input
              type="text"
              id="keySkills"
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button type="submit">Create Job Posting</Button>
        </form>
      </motion.div>

      <AnimatePresence>
        {jobPostings.map((jobPosting) => (
          <motion.div
            key={jobPosting.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <JobPostingCard jobPosting={jobPosting} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

