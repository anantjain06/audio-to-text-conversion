# Basic Imports
import os
import time
from dotenv import load_dotenv

# File Imports
from prompts.summary_prompt import SUMMARY_PROMPT_TEMPLATE

# Langchain Imports
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

load_dotenv()

repo_id = config['DEFAULT']['text_summarization_model']

def create_prompt():
    """
    Create a prompt for summarization using a template.
    Args:
        transcript (str): The text to summarize.
    Returns:
        list: A list of messages formatted for the summarization model.
    """

    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a helpful assiatant. Your task to help user summarize there meeting conversations."),
            ("human", SUMMARY_PROMPT_TEMPLATE)
        ]
    )
    return prompt_template

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
        
        chat_model = HuggingFaceEndpoint(
            repo_id=repo_id,
            huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_TOKEN"),
            task="conversational",
            max_new_tokens=512,
            temperature=0.2
        )
        llm = ChatHuggingFace(llm=chat_model)

        template = create_prompt()
        chain = template | llm | StrOutputParser()

        response = chain.invoke({"transcript" : transcript})

        end = time.time()
        print(f"Summarization completed in {end - start:.2f} seconds.")

        return response
    except Exception as e:
        print(f"Error in text_summarization: {str(e)}")
        return None