from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Sentiment Analysis Model
model_name = "joeddav/distilbert-base-uncased-go-emotions-student"

sentiment_model = AutoModelForSequenceClassification.from_pretrained(model_name)
sentiment_tokenizer = AutoTokenizer.from_pretrained(model_name)

sentiment_model.save_pretrained("./models/go_emotions")
sentiment_tokenizer.save_pretrained("./models/go_emotions")

# Intent Classification and Topic Distribution Model
model = AutoModelForSequenceClassification.from_pretrained("facebook/bart-large-mnli")
tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-mnli")

model.save_pretrained("./models/bart_mnli")
tokenizer.save_pretrained("./models/bart_mnli")