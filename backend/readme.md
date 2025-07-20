## Use python - 3.12

## Use the following commands
1. python3.12 -m venv env
2. source env/bin/activate
3. pip install -r requirements.txt
4. python scripts/download_model.py
5. python index.py

## text_to_speech.py - This file helps to create audio file using the script conversation.

## Use `docs/raw_audio/test-audio-1.wav` named files for testing purpose.
1. POST - http://127.0.0.1:8001/transcript
   form data:
   "file": "docs/test-audio-1.wav"

## Please Copy-Paste the transcript for further apis for testing purpose.
2. POST - http://127.0.0.1:8001/analysis
   api_data: 
   {"text": "....."}

3. POST - http://127.0.0.1:8001/summary
   api_data: 
   {"text": "....."}

## Create .env file and add `HUGGINGFACE_API_TOKEN` for summarization purpose

## Use-Cases (Meeting Call Summarization and Analysis): 
Input: Meeting Recordings or Audio Recordings
1. Frontend: 
   A. User can upload drive-links, meeting recordings, or audio recordings.
   B. Display the audio recordings and transcription.
   C. Show analysis the topics, intents and sentiments.
   D. Show summary of the meeting.
   E. Download the MoM points of the meeting.

2. Backend:
   A. Get the link or files and convert to audio file or directly get audio file.
   B. Get the text from the audio.
   C. Send the text for sentiment analysis, intent classification and topic distribution.
   D. Generated summary of conversation, Generate MoM points, Detect the participants.

## TODOs:
0. Performance improvement of openai-whisper. --- Done
1. Run sentiment analysis and intent_lassification parallely.   --- Done
2. Run analysis and summarization parallely.  --- Done
3. First provide transcript, later provide the analysis and summarization.
4. Only list Top-3 emotions and intents of the transcript so that labels and scores should be there.  --- Done
5. Performance Optimization.  --- OverAll Performance is better --- In-progress. 
6. Store the transcript, summary, and analysis to vector_store for further process if needed.
7. Based on the use-cases fetch sentiment and intent list. Add all the lists to code.configs.
8. For analysis, run all three functions in background.  

## Task Done:
1. Optimized the performance of transcripting the audio, by changing the model from small to base.
   - Model: small takes some time but the accuracy is `Better`
   - Model: base is faster then small and the accuracy is `Decent`
   - So choose 'base' model as it has decent accuracy and it is faster also. 

2. For Accuracy Improvement of sentiment analysis using `joeddav/distilbert-base-uncased-go-emotions-student` model.
3. For Intent Detection going with `facebook/bart-large-mnli` model, with static labelings.
4. For Topic Distribution, used same model as Intent Detection.
5. For Generating MoM points used the same model as summarization but the task is `text-generation`.
