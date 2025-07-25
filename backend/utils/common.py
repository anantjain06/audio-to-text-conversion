# Basic Prompts
import re
from datetime import datetime

# HuggingFace Transformer Imports
from transformers import pipeline

# Model
model_dir = "models/bart_mnli"
pipe = pipeline("zero-shot-classification", model=model_dir, tokenizer=model_dir)

def get_model_pipe(transcript, labels):
    """
    Applies a zero-shot classification pipeline to the given transcript using the provided labels.

    Args:
        transcript (str): The input text to classify.
        labels (list): A list of candidate labels for classification.

    Returns:
        dict: A dictionary containing the predicted labels and their confidence scores.
    """
    result = pipe(transcript, labels)
    return result

def get_labels_with_score(data):
    """
    Extracts the top 3 labels and their scores from the model output.

    Args:
        data (dict): Output from the classification model, expected to contain 'labels' and 'scores'.

    Returns:
        list: A list of dictionaries, each with 'label' and 'score' keys.
    """
    return [
        {"label": label, "score": score}
        for label, score in zip(data['labels'][:3], data['scores'][:3])
    ]

def load_summary_prompt(transcript):
    """
    Loads and formats a prompt template for generating a summary.

    Args:
        transcript (str): The transcript text to be inserted into the prompt.

    Returns:
        str: A formatted prompt with the current date/time and the transcript embedded.
    """
    with open('prompts/summary_prompt.md', "r") as f:
        return f.read().format(
            transcript=transcript
        )

def load_mom_generator_prompt(transcript):
    """
    Loads and formats a prompt template for generating minutes of meeting (MoM).

    Args:
        transcript (str): The transcript text to be inserted into the prompt.

    Returns:
        str: A formatted MoM prompt with the current date/time and the transcript embedded.
    """
    with open('prompts/minutes_prompts.md', "r") as f:
        return f.read().format(
            transcript=transcript
        )