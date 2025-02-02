"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("resume", file)

    // Mock API call
    await fetch("/api/resume-upload", {
      method: "POST",
      body: formData,
    })

    setFile(null)
    alert("Resume uploaded successfully!")
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
            Upload Resume (PDF or DOCX)
          </label>
          <Input type="file" id="resume" accept=".pdf,.docx" onChange={handleFileChange} required className="mt-1" />
        </div>
        <Button type="submit" disabled={!file}>
          Upload and Process Resume
        </Button>
      </form>
    </motion.div>
  )
}

