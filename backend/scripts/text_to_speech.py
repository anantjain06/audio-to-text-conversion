from gtts import gTTS

language = 'en'

def text_to_speech(conversation):
    """
    Convert a list of conversation strings into a single audio file using gTTS.
    Args:
        conversation (list): List of conversation strings.
    """

    # mytext = " ".join(conversation).replace(':', ' says')
    mytext = " ".join(conversation)
    myobj = gTTS(text=mytext, lang=language, slow=False)
    myobj.save("docs/raw_audio/test-audio-4.wav")
    print("Successfully converted text to speech and saved in docs/raw_audio folder")

with open('docs/test_transcripts/transcript_4.txt', 'r') as file:
    conversation = file.readlines()

text_to_speech(conversation)