# FastAPI Imports
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Concurrent Imports
# import concurrent.futures
from concurrent.futures import ProcessPoolExecutor
import functools

# Pydantic Imports
from pydantic import BaseModel

# Local Imports
from scripts.speech_to_text import transcript_audio
from scripts.intent_classification import intent_classification
from scripts.sentiment_analysis import sentiment_analysis
from scripts.topic_distribution import topic_distribution
from scripts.text_summarization import text_summarization
from scripts.mom_generator import mom_generator

# Basic Imports
import asyncio
import os
import shutil

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

origin_list = config['DEFAULT']['origin_list']

# Define a Pydantic model for the item
class Text(BaseModel):
    text: str

executor = ProcessPoolExecutor(max_workers=3)

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "../uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Root route for checking if the server is running
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Health check endpoint to monitor service status
@app.get("/health")
async def health():
    return {"status": "healthy"}


def get_file_locally(file):
    """
    Saves the uploaded file to the local filesystem.

    Args:
        file (UploadFile): The uploaded audio or video file.

    Returns:
        str: Full file path where the uploaded file is saved.
    """
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    # Save file in binary write mode
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_location

# Endpoint to handle file upload and perform transcription
@app.post("/transcript")
async def transcript(file: UploadFile = File(...)):
    """
    Accepts an audio/video file, saves it locally, and transcribes it using Whisper.

    Args:
        file (UploadFile): The uploaded audio/video file.

    Returns:
        dict: Transcription result as plain text.
    """
    try: 
        # Save uploaded file locally
        file_path = get_file_locally(file)

        # Perform transcription on the saved file
        transcript = transcript_audio(file_path)

        return {
            "transcript": transcript
        }
    
    except Exception as e:
        # Handle any unexpected errors
        return {"Error in index.py - transcript api": str(e)}

# Endpoint to perform sentiment, intent, and topic analysis
@app.post("/analysis")
def analysis(transcript: Text):
    """
    Performs NLP-based analysis on the provided transcript.

    Args:
        transcript (Text): Object containing the transcript text.

    Returns:
        dict: Analysis results including sentiment, intent, and topic classification.
    """
    try: 
        sentiment_result = sentiment_analysis(transcript.text)
        intent_result = intent_classification(transcript.text)
        topic_result = topic_distribution(transcript.text)

        return {
            "sentiment_result": sentiment_result,
            "intent_result": intent_result,
            "topic_result": topic_result
        }

    except Exception as error:
        return {"Error in index.py - analysis api": str(error)}

# Endpoint to generate summary and minutes of meeting
@app.post("/summary")
def summary(transcript: Text):
    """
    Generates a summary and key action points from the transcript.

    Args:
        transcript (Text): Object containing the transcript text.

    Returns:
        dict: Summary text and a list of key discussion points.
    """
    try:
        summary = text_summarization(transcript.text)
        points = mom_generator(transcript.text)

        return {
            "summary": summary, 
            "points": points
        }

    except Exception as error:
        return {"Error in index.py - summary api": str(error)}

if __name__ == "__main__":
    uvicorn.run(app=app, host="0.0.0.0", port=8001, reload=False)
