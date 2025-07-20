# from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
# from langchain_core.messages import SystemMessage, HumanMessage

# import os

# model="HuggingFaceTB/SmolLM2-1.7B-Instruct"

# llm = HuggingFaceEndpoint(
#     repo_id=model,
#     huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_TOKEN"),
#     task="summarization",
#     max_new_tokens=512,
#     temperature=0.2
# )

# chat_model = ChatHuggingFace(llm=llm)

# system_prompt = """
# You are a topic labeling assistant. Based on the following keywords and sample texts from a topic model, return a concise and descriptive label for the topic.

# Top keywords: ['Positive', 'Negative', 'Neutral']

# You also add more sentiment labels according to your understanding of the sample texts.

# For example,
# Sample text: "The product is great, I love it!"
# Label: "Positive"

# Sample text: {text}
# Label: 
# """

# messages = [
    
# ]

# # -------------------------------------------------------------------------------------------------------------

# text_1 = """
# Agent says hello. This is med care. How can I help you? Customer says hi. I'd like to book a consultation with Dr. Sharma for tomorrow. Agent says certainly, is this for a follow-up or a new appointment? Customer says it's a follow-up for my diabetes checkup. Agent says got it. Dr. Sharma is available at 11 a.m. and 3 p.m. tomorrow. Which slot would you prefer? Customer says 11 a.m. Please. Agent says your appointment is confirmed for tomorrow at 11 a.m. Anything else I can assist you with? Customer says no. That's all. Thanks for the quick help. Agent says you're welcome. Take care.
# """

# text = """
# Agent says Hello! Thank you for calling ShopEasy. How can I assist you today?Customer says Hi, I received my order yesterday, but the headphones are not working.Agent says I’m really sorry to hear that. Could you share your order number, please?Customer says Yes, it's #ORD123456.Agent says Thank you. I’ve pulled up your order. I can initiate a replacement right away.Customer says Honestly, this is the second time this happened. I'm not happy with the service.Agent says I completely understand your frustration. I’ll escalate this to our quality team and make sure the replacement is thoroughly checked.Customer says Alright. Please make it quick.Agent says I will. You’ll receive an update in 24 hours.Customer says Okay. Thanks
# """

# from transformers import pipeline

# pipe = pipeline("text-classification", model="joeddav/distilbert-base-uncased-go-emotions-student", top_k=5)
# results = pipe(text)

# print("result: ", results)

# # -------------------------------------------------------------------------------------------------------------

# HuggingFace Transformer Imports
from transformers import pipeline

# Config Imports
import configparser

# Basic Imports
import time
import asyncio
import functools

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

intent_list = config['DEFAULT'].get('intent_classification_list')
topic_labels = config['DEFAULT'].get('topic_classification_list')

text_analysis_model = config['DEFAULT']['text_analysis_model']
text_analysis_model_1 = config['DEFAULT']['text_analysis_model_1']

pipe_1 = pipeline("text-classification", model=text_analysis_model, top_k=3)
pipe_2 = pipeline("zero-shot-classification", model=text_analysis_model_1)

def get_intent_classification_labels(classification):
    return [
        {"label": label, "score": score}
        for label, score in zip(classification['labels'][:3], classification['scores'][:3])
    ]

def get_topic_distribution_labels(topics):
    return [
        {"label": label, "score": score}
        for label, score in zip(topics['labels'][:3], topics['scores'][:3])
    ]

def run_sentiment_pipe(transcript):
    return pipe_1(transcript)

def run_intent_pipe(transcript, label_list):
    return pipe_2(transcript, label_list, multi_label=True)

async def text_analysis(transcript):
    """
    Perform text analysis on the given transcript using zero-shot classification.
    Args:
        transcript (str): The text to analyze.
    Returns:
        tuple: A tuple containing the sentiment analysis and intent classification results.
    """

    try:
        start = time.time()

        loop = asyncio.get_event_loop()
        analysis_future = loop.run_in_executor(None, functools.partial(run_sentiment_pipe, transcript))
        classification_future = loop.run_in_executor(None, functools.partial(run_intent_pipe, transcript, intent_list))
        topic_future = loop.run_in_executor(None, functools.partial(run_intent_pipe, transcript, topic_labels))

        results = await asyncio.gather(analysis_future, classification_future, topic_future)

        classification_list = get_intent_classification_labels(results[1])
        topic_list = get_topic_distribution_labels(results[2])

        print("analysis: ", results[0][0])
        print("classification: ", classification_list)
        print("topic: ", topic_list)

        end = time.time()
        print(f"Analysis completed in {end - start:.2f} seconds.")

        return {"analysis": results[0], "classification": classification_list, "topics": topic_list}
    except Exception as e:
        print(f"Error in text_analysis: {str(e)}")
        return None, None
    
text = """
Project Manager (PM) says Good morning, everyone. Let’s start with a quick round of updates on our progress. David, can you go first?Developer (David) says Sure. This week I finished implementing the user login and registration features. I also fixed the cart syncing issue that was reported by QA.PM says Great. Any blockers on your end?Developer (David) says Not really. Although, I’m waiting for the final API spec for the payment gateway integration.PM says Noted. I’ll follow up with the backend team on that. Anna, over to you.Designer (Anna) says I’ve completed the designs for the product listing and detail pages. I shared the Figma files yesterday. Next, I’ll work on the mobile layouts.PM says Perfect. Please ensure the mobile version aligns with our responsive design system.Designer (Anna) says Will do.PM says Sam, how’s QA progressing?QA Engineer (Sam) says We completed smoke testing for the last sprint. We found 6 bugs, mostly minor UI inconsistencies. I’ve logged them in Jira. Also, testing for the registration flow is pending until tomorrow.PM says Thanks. Please prioritize that and flag anything critical.QA Engineer (Sam) says Understood.PM says Lastly, we’re planning for a client demo next Thursday. So, let’s make sure all major components are stable by Tuesday EOD. Any concerns?Developer (David) says As long as I get the payment API by Monday, I should be good.Designer (Anna) says No concerns from my side.QA Engineer (Sam) says All good.PM says Awesome. Thanks, team. Keep up the good work.
"""

if __name__ == "__main__":
    asyncio.run(text_analysis(text))
