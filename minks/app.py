from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from google.cloud import vision
from google.cloud.vision_v1 import types
import io
from utils.resume_processor import process_resume, remove_personal_info, score_resume, generate_report
import requests

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

# Test API call to simulate uploading files and getting results
def test_api():
    # Path to your local resume and job description text files
    resume_path = 'path_to_resume.txt'
    job_description_path = 'path_to_job_description.txt'

    # Open the files in 'rb' mode (binary) as you're sending them as files
    with open(resume_path, 'rb') as resume_file, open(job_description_path, 'rb') as job_description_file:
        # Create a dictionary for the files
        files = {
            'resume': (resume_path, resume_file, 'text/plain'),
            'job_description': (job_description_path, job_description_file, 'text/plain')
        }
        
        # Make the POST request to the Flask endpoint
        response = requests.post('http://127.0.0.1:5000/upload', files=files)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            print("Response from API:", response.json())  # Print the returned JSON response
        else:
            print("Error occurred:", response.status_code)

# Run the test API function when app is started
if __name__ == '__main__':
    test_api()  # Call the test function here
    app.run(debug=True)
