# OpenAI Whisper Imports
import whisper

# Video Imports
import mimetypes
from moviepy import VideoFileClip, AudioFileClip

# Basic Imports
import time
import os

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()    
config.read('code.config')

transcript_model = config['DEFAULT']['transcript_model']

model = whisper.load_model(transcript_model)

def convert_to_wav(file_path):
    """
    Converts an MP4 or MP3 file to WAV format using MoviePy.

    Args:
        file_path (str): Path to the input MP4 or MP3 file.

    Returns:
        str or None: Path to the converted .wav file if successful, else None.
    """
    try:
        base, ext = os.path.splitext(file_path)
        output_path = f"{base}.wav"

        if ext.lower() == ".mp4":
            video = VideoFileClip(file_path)
            video.audio.write_audiofile(output_path)
        elif ext.lower() == ".mp3":
            audio = AudioFileClip(file_path)
            audio.write_audiofile(output_path)
            
        return output_path
    except Exception as error:
        print(f"Error in converting to wav file: {str(error)}")
        return None

def transcript_audio(audio_file_path):
    """
    Transcribes audio using the Whisper model.
    Supports .mp4, .mp3, and .wav files. Converts non-wav formats to .wav before transcription.

    Args:
        audio_file_path (str): Path to the audio or video file to transcribe.

    Returns:
        str or None: Transcribed text if successful, otherwise None.
    """
    try: 
        start = time.time()

        mime_type, _ = mimetypes.guess_type(audio_file_path)
        allowed_types = ['audio/mpeg', 'video/mp4', 'audio/wav', 'audio/x-wav']

        if mime_type not in allowed_types:
            raise ValueError(f"Unsupported file type: {mime_type}")

        ext = os.path.splitext(audio_file_path)[1].lower()

        if ext != '.wav':
            print(f"Converting {ext} to .wav...")
            audio_file_path = convert_to_wav(audio_file_path)

        result = model.transcribe(audio_file_path, language="en", fp16=False)
        
        end = time.time()
        print(f"Transcription completed in {end - start:.2f} seconds.")
        return result["text"]
    
    except Exception as e:
        print(f"Error in transcribe_audio: {str(e)}")
        return None