from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_resume', methods=['POST'])
def process_resume():
    resume_txt = request.files['resume'].read().decode('utf-8')  # Resume TXT file
    job_description_txt = request.files['job_description'].read().decode('utf-8')  # Job Description TXT file
    candidate_skills_txt = request.files['candidate_skills'].read().decode('utf-8')  # Candidate Key Skills TXT file
    
    # Process the files (scrub personal info, compare skills, etc.)
    scrubbed_resume, score, report = process_resume_logic(resume_txt, job_description_txt, candidate_skills_txt)
    
    # Return scrubbed resume and report
    return jsonify({
        "scrubbed_resume": scrubbed_resume,
        "score": score,
        "report": report
    })

def process_resume_logic(resume_txt, job_description_txt, candidate_skills_txt):
    scrubbed_resume = scrub_personal_info(resume_txt)  # Scrub personal info from resume
    score = calculate_score(resume_txt, job_description_txt, candidate_skills_txt)  # Score based on job description and candidate skills
    report = generate_report(score, resume_txt)  # Generate report with matching skills and experience
    
    return scrubbed_resume, score, report

if __name__ == '__main__':
    app.run(debug=True)
