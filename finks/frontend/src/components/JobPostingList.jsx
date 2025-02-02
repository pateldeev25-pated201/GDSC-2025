import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import JobPostingCard from "./JobPostingCard";
import JobPostingForm from "./JobPostingForm"; // ✅ This is the ONLY instance of JobPostingForm

function JobPostingList() {
  const [jobPostings, setJobPostings] = useState([
    {
      id: "1",
      title: "Software Engineer",
      description: "Looking for an experienced software engineer.",
      keySkills: ["JavaScript", "React", "Node.js"],
    },
    {
      id: "2",
      title: "Cybersecurity Analyst",
      description: "Seeking an expert in penetration testing and network security.",
      keySkills: ["Ethical Hacking", "SIEM", "Cloud Security"],
    },
  ]);

  // ✅ Function to add new job postings to the list
  const addJobPosting = (newJobPosting) => {
    setJobPostings((prevPostings) => [...prevPostings, newJobPosting]);
  };

  return (
    <div>
      <JobPostingForm addJobPosting={addJobPosting} />  {/* ✅ This is the ONLY JobPostingForm */}
      
      <h2 className="job-posting-header">Job Postings</h2>
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
  );
}

export default JobPostingList;
