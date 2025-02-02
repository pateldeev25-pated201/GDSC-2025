import { NextResponse } from "next/server"

export async function GET() {
  // This is a mock API response
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      matchPercentage: 85,
      skillMatch: ["JavaScript", "React", "Node.js"],
      experienceLevel: "Senior",
      missingQualifications: ["GraphQL"],
    },
    {
      id: 2,
      name: "Jane Smith",
      matchPercentage: 92,
      skillMatch: ["Python", "Machine Learning", "Data Analysis"],
      experienceLevel: "Mid-level",
      missingQualifications: [],
    },
    {
      id: 3,
      name: "Bob Johnson",
      matchPercentage: 68,
      skillMatch: ["Java", "Spring Boot"],
      experienceLevel: "Junior",
      missingQualifications: ["Microservices", "Docker"],
    },
  ]

  return NextResponse.json(candidates)
}

