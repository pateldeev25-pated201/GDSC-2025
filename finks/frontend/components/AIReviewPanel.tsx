import { motion } from "framer-motion"

interface AIReviewPanelProps {
  candidateName: string
  matchPercentage: number
  skillMatch: string[]
  experienceLevel: string
  missingQualifications: string[]
}

export default function AIReviewPanel({
  candidateName,
  matchPercentage,
  skillMatch,
  experienceLevel,
  missingQualifications,
}: AIReviewPanelProps) {
  const isGoodFit = matchPercentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 rounded-lg p-4 mt-4"
    >
      <h3 className="text-lg font-semibold mb-2">{candidateName}</h3>
      <div className="flex items-center mb-2">
        <div className={`text-xl font-bold ${isGoodFit ? "text-green-500" : "text-red-500"}`}>
          {matchPercentage}% Match
        </div>
        <span
          className={`ml-2 px-2 py-1 rounded-full text-sm ${isGoodFit ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {isGoodFit ? "Good Fit" : "Not a Good Fit"}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Skill Match:</strong> {skillMatch.join(", ")}
        </div>
        <div>
          <strong>Experience Level:</strong> {experienceLevel}
        </div>
        {missingQualifications.length > 0 && (
          <div>
            <strong>Missing Qualifications:</strong> {missingQualifications.join(", ")}
          </div>
        )}
      </div>
    </motion.div>
  )
}

