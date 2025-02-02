import { motion } from "framer-motion"

function AIReviewPanel({ candidateName, matchPercentage, skillMatch, experienceLevel, missingQualifications }) {
  const isGoodFit = matchPercentage >= 70

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ai-review-panel"
    >
      <h3 className="ai-review-title">{candidateName}</h3>
      <div className="ai-review-match">
        <div className="ai-review-percentage" style={{ color: isGoodFit ? "#059669" : "#dc2626" }}>
          {matchPercentage}% Match
        </div>
        <span className={`ai-review-fit ${isGoodFit ? "good-fit" : "not-good-fit"}`}>
          {isGoodFit ? "Good Fit" : "Not a Good Fit"}
        </span>
      </div>
      <div className="ai-review-details">
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

export default AIReviewPanel

