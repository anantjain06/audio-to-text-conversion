# Basic Prompts
import os
from datetime import datetime

# HuggingFace Transformer Imports
from transformers import pipeline

# Model
model_dir = "models/bart_mnli"
pipe = pipeline("zero-shot-classification", model=model_dir, tokenizer=model_dir)

def get_model_pipe(transcript, labels):
    result = pipe(transcript, labels)
    return result

def get_labels_with_score(data):
    return [
        {"label": label, "score": score}
        for label, score in zip(data['labels'][:3], data['scores'][:3])
    ]

def load_summary_prompt(transcript):
    with open('prompts/summary_prompt.md', "r") as f:
        return f.read().format(
            current_date_and_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            transcript = transcript
        )

def load_mom_generator_prompt(transcript):
    with open('prompts/minutes_prompts.md', "r") as f:
        return f.read().format(
            current_date_and_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            transcript = transcript
        )
