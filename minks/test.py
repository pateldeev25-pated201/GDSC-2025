import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Debugging: Print the environment variable
print("GOOGLE_APPLICATION_CREDENTIALS:", os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))

# Check if the file actually exists
if not os.path.exists(os.getenv("GOOGLE_APPLICATION_CREDENTIALS")):
    print("Error: File not found!")
else:
    print("Success: File found!")

# Initialize Google Cloud Vision API client
from google.cloud import vision
client = vision.ImageAnnotatorClient()
