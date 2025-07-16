# OpenAI Whisper Imports
import whisper

# Basic Imports
import time

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()    
config.read('code.config')

transcript_model = config['DEFAULT']['transcript_model']

def transcribe_audio(audio_file_path):
    """
    Transcribe audio using the Whisper model.
    Returns:
        str: Transcribed text from the audio file.
    """
    try: 
        start = time.time()
    
        model = whisper.load_model(transcript_model)
        result = model.transcribe(audio_file_path, language="en", fp16=False)
        
        end = time.time()
        print(f"Transcription completed in {end - start:.2f} seconds.")
        return result["text"]
    
    except Exception as e:
        print(f"Error in transcribe_audio: {str(e)}")
        return None