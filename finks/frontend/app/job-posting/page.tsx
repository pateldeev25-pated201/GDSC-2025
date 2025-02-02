"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function JobPostingPage() {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [keySkills, setKeySkills] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock API call
    await fetch("/api/job-posting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobTitle, jobDescription, keySkills }),
    })
    // Reset form
    setJobTitle("")
    setJobDescription("")
    setKeySkills("")
    alert("Job posting created successfully!")
  }

  return (
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
  )
}

