MOM_PROMPT_TEMPLATE = """
You are a highly skilled assistant trained to extract **Minutes of Meeting (MoM)** from corporate meeting transcripts.

Please analyze the transcript below and return only the following sections — in this format:

1. **Meeting Objective**
2. **Key Discussion Points**
3. **Decisions Made**
4. **Action Items**
5. **Next Steps**

Avoid repeating the instructions or transcript in the output.

Input:
Transcript:
{transcript}
"""
