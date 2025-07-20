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

# Define a Pydantic model for the item
class Text(BaseModel):
    text: str

executor = ProcessPoolExecutor(max_workers=3)

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "../uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

def get_file_locally(file):
    """
    Save the uploaded file to the local filesystem.
    Args:
        file (UploadFile): The uploaded file.
    Returns:
        str: The file location where the file is saved.
    """
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_location

@app.post("/transcript")
async def transcript(file: UploadFile = File(...)):
    """
    Perform audio transcription, text analysis, and summarization.
    Args:
        data (Item): Contains the audio file path.
    Returns:
        dict: Contains the transcript, sentiment analysis, intent classification, and summary.
    """

    try: 
        file_path = get_file_locally(file)
        transcript = transcript_audio(file_path)

        return {
            "transcript": transcript
        }
    
    except Exception as e:
        return {"Error in index.py - transcript api": str(e)}
    
@app.post("/analysis")
def analysis(transcript: Text):

    try: 
        sentiment_result = sentiment_analysis(transcript.text)
        intent_result = intent_classification(transcript.text)
        topic_result = topic_distribution(transcript.text)

        # loop = asyncio.get_event_loop()
        # sentiment_future = loop.run_in_executor(executor, functools.partial(sentiment_analysis, transcript))
        # intent_future = loop.run_in_executor(executor, functools.partial(intent_classification, transcript))
        # topic_future = loop.run_in_executor(executor, functools.partial(topic_distribution, transcript))

        # results = await asyncio.gather(sentiment_future, intent_future, topic_future)

        # print("Results: ", results)
        
        # with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        #     future_sentiment = executor.submit(sentiment_analysis, transcript)
        #     future_intent = executor.submit(intent_classification, transcript)
        #     future_topic = executor.submit(topic_distribution, transcript)

        # sentiment_result = future_sentiment.result()
        # intent_result = future_intent.result()
        # topic_result = future_topic.result()

        return {
            "sentiment_result": sentiment_result,
            "intent_result": intent_result,
            "topic_result": topic_result
        }
    except Exception as error:
        return {"Error in index.py - analysis api": str(error)}

@app.post("/summary")
def summary(transcript: Text):
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
    uvicorn.run(app=app, host="127.0.0.1", port=8001, reload=False)
