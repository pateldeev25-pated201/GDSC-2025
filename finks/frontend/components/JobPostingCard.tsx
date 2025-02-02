"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AIReviewPanel from "@/components/AIReviewPanel"

interface JobPosting {
  id: string
  title: string
  description: string
  keySkills: string[]
}

interface JobPostingCardProps {
  jobPosting: JobPosting
}

export default function JobPostingCard({ jobPosting }: JobPostingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [aiReview, setAiReview] = useState<any | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    // Simulate AI review process
    setTimeout(() => {
      const dummyReview = {
        candidateName: file.name.split(".")[0],
        matchPercentage: Math.floor(Math.random() * 100),
        skillMatch: jobPosting.keySkills.filter(() => Math.random() > 0.5),
        experienceLevel: ["Junior", "Mid-level", "Senior"][Math.floor(Math.random() * 3)],
        missingQualifications: jobPosting.keySkills.filter(() => Math.random() > 0.7),
      }
      setAiReview(dummyReview)
    }, 1500)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{jobPosting.title}</h2>
      <p className="text-gray-600 mb-2">{jobPosting.description.substring(0, 100)}...</p>
      <div className="mb-4">
        <strong>Key Skills:</strong> {jobPosting.keySkills.join(", ")}
      </div>
      <Button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Hide Resume Upload" : "Upload Resume"}</Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="mb-2" />
            <Button onClick={handleUpload} disabled={!file}>
              Process Resume
            </Button>

            {aiReview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4"
              >
                <AIReviewPanel {...aiReview} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

