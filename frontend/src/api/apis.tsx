import axios from "axios";

export async function transcript_api(file: File) {
  const formData = new FormData();
  formData.append("file", file); // "file" must match what your backend expects

  try {
    const response = await axios.post(
      "http://172.29.128.148:8001/transcript",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response: ", response);
    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function analysis_api(transcript: string) {
  try {
    const response = await axios.post(
      "http://172.29.128.148:8001/analysis",
      {
        text: transcript,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}

export async function summary_api(transcript: string) {
    console.log('transcript', transcript);
  try {
    const response = await axios.post(
      "http://172.29.128.148:8001/summary",
      {
        text: transcript,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
