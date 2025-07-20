# Basic Import
import time

# File Imports
from utils.common import get_labels_with_score, get_model_pipe

# Config Imports
import configparser

# Load configuration
config = configparser.ConfigParser()
config.read('code.config')

# Load topic Labels
topic_labels = config['DEFAULT'].get('topic_distribution_list')

# text = """
# Project Manager (PM) says Good morning, everyone. Let’s start with a quick round of updates on our progress. David, can you go first?Developer (David) says Sure. This week I finished implementing the user login and registration features. I also fixed the cart syncing issue that was reported by QA.PM says Great. Any blockers on your end?Developer (David) says Not really. Although, I’m waiting for the final API spec for the payment gateway integration.PM says Noted. I’ll follow up with the backend team on that. Anna, over to you.Designer (Anna) says I’ve completed the designs for the product listing and detail pages. I shared the Figma files yesterday. Next, I’ll work on the mobile layouts.PM says Perfect. Please ensure the mobile version aligns with our responsive design system.Designer (Anna) says Will do.PM says Sam, how’s QA progressing?QA Engineer (Sam) says We completed smoke testing for the last sprint. We found 6 bugs, mostly minor UI inconsistencies. I’ve logged them in Jira. Also, testing for the registration flow is pending until tomorrow.PM says Thanks. Please prioritize that and flag anything critical.QA Engineer (Sam) says Understood.PM says Lastly, we’re planning for a client demo next Thursday. So, let’s make sure all major components are stable by Tuesday EOD. Any concerns?Developer (David) says As long as I get the payment API by Monday, I should be good.Designer (Anna) says No concerns from my side.QA Engineer (Sam) says All good.PM says Awesome. Thanks, team. Keep up the good work.
# """ 

def topic_distribution(transcript):
    try:
        start = time.time()
        result = get_model_pipe(transcript, topic_labels)
        topic_labels_with_score = get_labels_with_score(result)
        end = time.time()
        print(f"Time Taken For Topic Distribution: {end - start:.2f} seconds.")
        return topic_labels_with_score
    except Exception as error:
        print("Error in topic distribution file: ", str(error))