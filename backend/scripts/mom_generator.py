# Basic Imports
import os
import time
from dotenv import load_dotenv

# File Imports
from utils.common import load_mom_generator_prompt

# Langchain Imports
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_core.messages import SystemMessage

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

load_dotenv()

repo_id = config['DEFAULT']['text_summarization_model']

def create_prompt(transcript):
    """
    Create a prompt for generating using a template.
    Args:
        transcript (str): The text to generate points.
    Returns:
        list: A list of messages formatted for the text-generation model.
    """

    sys_prompt = load_mom_generator_prompt(transcript)

    messages = [
        SystemMessage(content=sys_prompt),
    ]

    return messages

def mom_generator(transcript):
    """
    Generate MOM points of given transcript using a HuggingFace model.
    Args:
        transcript (str): The text to generate points.
    Returns:
        str: The generate MoM points.
    """
    try:
        start = time.time()
        
        llm = HuggingFaceEndpoint(
            repo_id=repo_id,
            huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_TOKEN"),
            task="text-generation",
            max_new_tokens=512,
            temperature=0.2,
            streaming=True
        )

        chat_model = ChatHuggingFace(llm=llm)

        messages = create_prompt(transcript)
        ai_msg = chat_model.invoke(messages)

        end = time.time()
        print(f"Generation completed in {end - start:.2f} seconds.")

        return ai_msg.content
    except Exception as e:
        print(f"Error in mom_generator: {str(e)}")
        return None