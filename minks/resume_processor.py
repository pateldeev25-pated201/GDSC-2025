import re
from google.cloud import vision
from google.cloud.vision_v1 import types
import io
from collections import Counter
import string

# Google Vision API Client
client = vision.ImageAnnotatorClient()

def process_resume(resume_path):
    """
    Process the resume and extract text from the PDF using Google Vision API.
    """
    with open(resume_path, 'rb') as pdf_file:
        content = pdf_file.read()

    # Use Vision API to extract text from PDF
    image = types.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    resume_text = texts[0].description if texts else ""
    return resume_text

def remove_personal_info(resume_text):
    """
    Remove personal information such as names, phone numbers, emails, etc.
    """
    # Basic Regex to remove phone numbers, emails, and names
    resume_text = re.sub(r'\b[A-Za-z]+ [A-Za-z]+\b', '[REDACTED_NAME]', resume_text)  # Removing names
    resume_text = re.sub(r'\b\d{10}\b', '[REDACTED_PHONE]', resume_text)  # Removing phone numbers
    resume_text = re.sub(r'\S+@\S+', '[REDACTED_EMAIL]', resume_text)  # Removing email addresses

    # You can extend this regex to include more patterns as needed.
    return resume_text

def score_resume(resume_text, job_description_text):
    """
    Score the resume based on its similarity to the job description.
    """
    # Tokenize the job description and resume
    resume_tokens = tokenize(resume_text)
    job_description_tokens = tokenize(job_description_text)

    # Calculate similarity (e.g., using a simple match of keywords)
    common_tokens = set(resume_tokens) & set(job_description_tokens)
    score = (len(common_tokens) / len(job_description_tokens)) * 100  # Simple match percentage
    return round(score, 2)

def tokenize(text):
    """
    Tokenize the text (convert it to a list of lowercased words without punctuation)
    """
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
    return text.split()

def generate_report(score, resume_text):
    """
    Generate a report based on the score and resume features.
    """
    report = f"Resume Score: {score}\n"
    report += "Key Features from the Resume:\n"
    
    # List key skills (example, you can extend this)
    key_skills = ["python", "java", "communication", "leadership"]
    features = [skill for skill in key_skills if skill in resume_text.lower()]
    report += "\n".join(features)
    
    return report
