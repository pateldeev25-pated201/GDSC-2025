"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AIReviewPanel from "@/components/AIReviewPanel"
import { Button } from "@/components/ui/button"

interface Candidate {
  id: number
  name: string
  matchPercentage: number
  skillMatch: string[]
  experienceLevel: string
  missingQualifications: string[]
}

export default function ResultsDashboard() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    // Mock API call to fetch candidates
    const fetchCandidates = async () => {
      const response = await fetch("/api/candidates")
      const data = await response.json()
      setCandidates(data)
    }
    fetchCandidates()
  }, [])

  const sortedCandidates = [...candidates].sort((a, b) => {
    return sortOrder === "desc" ? b.matchPercentage - a.matchPercentage : a.matchPercentage - b.matchPercentage
  })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Results Dashboard</h1>
        <Button onClick={toggleSortOrder}>Sort {sortOrder === "desc" ? "Ascending" : "Descending"}</Button>
      </div>
      {sortedCandidates.map((candidate) => (
        <AIReviewPanel key={candidate.id} {...candidate} />
      ))}
    </motion.div>
  )
}

