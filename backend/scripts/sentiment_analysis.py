# HuggingFace Transformer Imports
from transformers import pipeline

# Basic Import
import time

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

# Model
model_dir = "models/go_emotions"
sentiment_pipe = pipeline("text-classification", model=model_dir, tokenizer=model_dir, top_k=3)

# text = """
# Project Manager (PM) says Good morning, everyone. Let’s start with a quick round of updates on our progress. David, can you go first?Developer (David) says Sure. This week I finished implementing the user login and registration features. I also fixed the cart syncing issue that was reported by QA.PM says Great. Any blockers on your end?Developer (David) says Not really. Although, I’m waiting for the final API spec for the payment gateway integration.PM says Noted. I’ll follow up with the backend team on that. Anna, over to you.Designer (Anna) says I’ve completed the designs for the product listing and detail pages. I shared the Figma files yesterday. Next, I’ll work on the mobile layouts.PM says Perfect. Please ensure the mobile version aligns with our responsive design system.Designer (Anna) says Will do.PM says Sam, how’s QA progressing?QA Engineer (Sam) says We completed smoke testing for the last sprint. We found 6 bugs, mostly minor UI inconsistencies. I’ve logged them in Jira. Also, testing for the registration flow is pending until tomorrow.PM says Thanks. Please prioritize that and flag anything critical.QA Engineer (Sam) says Understood.PM says Lastly, we’re planning for a client demo next Thursday. So, let’s make sure all major components are stable by Tuesday EOD. Any concerns?Developer (David) says As long as I get the payment API by Monday, I should be good.Designer (Anna) says No concerns from my side.QA Engineer (Sam) says All good.PM says Awesome. Thanks, team. Keep up the good work.
# """

def sentiment_analysis(transcript):
    """
    Performs sentiment analysis on the given transcript using a pre-defined pipeline.

    Args:
        transcript (str): The input text or speech transcription to analyze.

    Returns:
        dict: A dictionary containing the top sentiment label (e.g., 'POSITIVE', 'NEGATIVE', 'NEUTRAL') 
              along with its confidence score.
    """
    try:
        start = time.time()
        sentiment_labels_with_score = sentiment_pipe(transcript)
        end = time.time()
        print(f"Time Taken For Sentiment Analysis: {end - start:.2f} seconds.")
        return sentiment_labels_with_score[0]
    except Exception as error:
        print("Error in sentiment analysis file: ", str(error))