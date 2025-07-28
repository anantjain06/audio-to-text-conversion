## Use python - 3.12
## Use node - v22.16.0 
## Use npm - v10.9.2

## Use the following commands for backend
1. cd backend
2. python3.12 -m venv env
3. source env/bin/activate
4. pip install -r requirements.txt
5. python scripts/download_model.py
6. python index.py

## Use the following command for frontend
1. cd frontend
2. npm run dev

## text_to_speech.py - This file helps to create audio file using the script conversation.

## Use `docs/raw_audio/test-audio-1.wav` named files for testing purpose.
1. POST - http://127.0.0.1:8001/transcript
   form data:
   "file": "docs/test-audio-1.wav"

## Please Copy-Paste the transcript for further apis for testing purpose.
2. POST - http://127.0.0.1:8001/analysis

   api_data: 
   {"text": "....."}

   Example : api-body:
   {
      "audio_file_path": "docs/test-audio-1.wav"
   }

   Create .env file and add `HUGGINGFACE_API_TOKEN` for summarization purpose

3. POST - http://127.0.0.1:8001/summary
   api_data: 
   {"text": "....."}

## Create .env file and add `HUGGINGFACE_API_TOKEN` for summarization purpose

# Script Conversation
tts.py - This file helps to create audio file using the script conversation.
Use `test-audio-1.wav` this file for testing purpose.
