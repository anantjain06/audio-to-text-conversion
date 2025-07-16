# FastAPI Imports
from fastapi import FastAPI
import uvicorn

# Pydantic Imports
from pydantic import BaseModel

# Local Imports
from transcribe_audio import transcribe_audio
from text_analysis import text_analysis
from text_summarization import text_summarization

# Define a Pydantic model for the item
class Item(BaseModel):
    audio_file_path: str 

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/analysis")
async def analysis(data: Item):
    """
    Perform audio transcription, text analysis, and summarization.
    Args:
        data (Item): Contains the audio file path.
    Returns:
        dict: Contains the transcript, sentiment analysis, intent classification, and summary.
    """

    try: 
        transcript = transcribe_audio(data.audio_file_path)
        sentiment_list, intent_list = text_analysis(transcript)
        summary = text_summarization(transcript)

        return {
            "transcript": transcript, 
            "sentiment_analysis": sentiment_list, 
            "intent_classification": intent_list, 
            "summary": summary
        }
    except Exception as e:
        return {"Error in index.py": str(e)}


if __name__ == "__main__":
    uvicorn.run(app=app, host="127.0.0.1", port=8001, reload=False)
