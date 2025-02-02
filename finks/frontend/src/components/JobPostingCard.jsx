import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button"; // ✅ Corrected Path
import { Input } from "../components/ui/input";
import AIReviewPanel from "./AIReviewPanel";
import "../styles/JobPostingCard.css"; // ✅ Ensure CSS is applied

function JobPostingCard({ jobPosting }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [file, setFile] = useState(null);
  const [aiReview, setAiReview] = useState(null);

  console.log("Rendering JobPostingCard for:", jobPosting.title); // ✅ Debugging log

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setTimeout(() => {
      const dummyReview = {
        candidateName: file.name.split(".")[0],
        matchPercentage: Math.floor(Math.random() * 100),
        skillMatch: jobPosting.keySkills.filter(() => Math.random() > 0.5),
        experienceLevel: ["Junior", "Mid-level", "Senior"][Math.floor(Math.random() * 3)],
        missingQualifications: jobPosting.keySkills.filter(() => Math.random() > 0.7),
      };
      setAiReview(dummyReview);
    }, 1500);
  };

  return (
    <div className="job-posting-card">
      <h2 className="job-posting-title">{jobPosting.title}</h2>
      <p className="job-posting-description">{jobPosting.description}</p>
      <div className="job-posting-skills">
        <strong>Key Skills:</strong> {jobPosting.keySkills.join(", ")}
      </div>

      {/* ✅ Always Render the "Upload Resume" Button */}
      <Button
        className="job-posting-btn"
        onClick={() => {
          setIsExpanded(!isExpanded);
          console.log("Upload Resume clicked, isExpanded:", !isExpanded); // ✅ Debugging log
        }}
      >
        {isExpanded ? "Hide Resume Upload" : "Upload Resume"}
      </Button>

      {/* ✅ Ensure Upload Section Appears Properly */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="resume-upload-container"
          >
            <div className="form-group">
              <Input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="file-input" />
            </div>
            <Button className="job-posting-btn" onClick={handleUpload} disabled={!file}>
              Process Resume
            </Button>

            {aiReview && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <AIReviewPanel {...aiReview} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JobPostingCard;
