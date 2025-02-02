import os
from dotenv import load_dotenv
from google.cloud import vision

# Load environment variables from .env
load_dotenv()

# Verify if the credentials file is loaded correctly
print("Credentials Path:", os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))

# Initialize Google Cloud Vision API client
client = vision.ImageAnnotatorClient()
print("Google Cloud Vision API is working!")
