from gtts import gTTS

conversation = [
    "Agent: Hello! Thank you for calling ShopEasy. How can I assist you today?",
    "Customer: Hi, I received my order yesterday, but the headphones are not working.",
    "Agent: I’m really sorry to hear that. Could you share your order number, please?",
    "Customer: Yes, it's #ORD123456.",
    "Agent: Thank you. I’ve pulled up your order. I can initiate a replacement right away.",
    "Customer: Honestly, this is the second time this happened. I'm not happy with the service.",
    "Agent: I completely understand your frustration. I’ll escalate this to our quality team and make sure the replacement is thoroughly checked.",
    "Customer: Alright. Please make it quick.",
    "Agent: I will. You’ll receive an update in 24 hours.",
    "Customer: Okay. Thanks."
]

mytext = " ".join(conversation).replace(':', ' says')

language = 'en'

myobj = gTTS(text=mytext, lang=language, slow=False)

myobj.save("test-audio-1.wav")