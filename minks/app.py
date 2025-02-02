from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from google.cloud import vision
from google.cloud.vision_v1 import types
import io
from utils.resume_processor import process_resume, remove_personal_info, score_resume, generate_report

# Load environment variables from .env file
load_dotenv()

# Set up the Flask app
app = Flask(__name__)

# Google Cloud Vision API client
client = vision.ImageAnnotatorClient()

# Endpoint for uploading resumes and job descriptions
@app.route('/upload', methods=['POST'])
def upload_files():
    if 'resume' not in request.files or 'job_description' not in request.files:
        return jsonify({"error": "Please upload both resume and job description files."}), 400
    
    resume_file = request.files['resume']
    job_description_file = request.files['job_description']

    # Save the files temporarily
    resume_path = os.path.join('uploads', 'resume.txt')
    job_description_path = os.path.join('uploads', 'job_description.txt')

    resume_file.save(resume_path)
    job_description_file.save(job_description_path)

    # Process the resume and job description
    resume_text = process_resume(resume_path)
    job_description_text = job_description_file.read().decode("utf-8")

    # Remove personal info from resume
    cleaned_resume = remove_personal_info(resume_text)

    # Score the resume based on the job description
    resume_score = score_resume(cleaned_resume, job_description_text)

    # Generate a report
    report = generate_report(resume_score, cleaned_resume)

    # Send back the cleaned resume and the report
    return jsonify({
        'cleaned_resume': cleaned_resume,
        'resume_score': resume_score,
        'report': report
    })

if __name__ == '__main__':
    app.run(debug=True)
