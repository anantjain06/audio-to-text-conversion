# Basic Imports
import os
import time
from dotenv import load_dotenv

# Langchain Imports
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_core.messages import SystemMessage, HumanMessage

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

load_dotenv()

repo_id = config['DEFAULT']['text_summarization_model']

def create_prompt(transcript):
    """
    Create a prompt for summarization using a template.
    Args:
        transcript (str): The text to summarize.
    Returns:
        list: A list of messages formatted for the summarization model.
    """

    with open("summarization_prompt.txt", "r") as file:
        prompt_template = file.read()

    final_prompt = prompt_template.replace("<<<TRANSCRIPT>>>", transcript.strip())

    messages = [
        SystemMessage(content="You are a conversation summarization assistant."),
        HumanMessage(content=final_prompt),
    ]

    return messages

def text_summarization(transcript):
    """
    Summarize the given transcript using a HuggingFace model.
    Args:
        transcript (str): The text to summarize.
    Returns:
        str: The summarized text.
    """
    try:
        start = time.time()
        
        llm = HuggingFaceEndpoint(
            repo_id=repo_id,
            huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_TOKEN"),
            task="summarization",
            max_new_tokens=512,
            temperature=0.2,
            streaming=True
        )

        chat_model = ChatHuggingFace(llm=llm)

        messages = create_prompt(transcript)
        ai_msg = chat_model.invoke(messages)

        end = time.time()
        print(f"Summarization completed in {end - start:.2f} seconds.")

        return ai_msg.content
    except Exception as e:
        print(f"Error in text_summarization: {str(e)}")
        return None