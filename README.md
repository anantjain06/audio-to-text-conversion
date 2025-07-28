# Audio Analysis Application

This project provides a full-stack solution for audio transcription, analysis, and summarization using a Python-based backend and a Node.js frontend.

---

## 🧰 Prerequisites

Make sure you have the following versions installed:

- **Python**: `3.12`
- **Node.js**: `v22.16.0`
- **npm**: `v10.9.2`

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd backend
python3.12 -m venv env
source env/bin/activate
pip install -r requirements.txt
python scripts/download_model.py
python index.py
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm run dev
```

---

## 🔊 Script-Based Audio Generation

Use `text_to_speech.py` or `tts.py` to convert text scripts into audio files.

- Test file: `docs/raw_audio/test-audio.wav`

---

## 🧪 API Usage Guide

### 1. Transcription

**Endpoint**: `POST http://127.0.0.1:8001/transcript`  
**Form Data**:
```
file: docs/raw_audio/test-audio.wav
```

---

### 2. Analysis

**Endpoint**: `POST http://127.0.0.1:8001/analysis`  
**Headers**: `Content-Type: application/json`  
**Body Example**:
```json
{
  "text": "Paste transcript text here",
  "audio_file_path": "docs/raw_audio/test-audio.wav"
}
```

---

### 3. Summarization

**Endpoint**: `POST http://127.0.0.1:8001/summary`  
**Headers**: `Content-Type: application/json`  
**Body Example**:
```json
{
  "text": "Paste transcript text here"
}
```

> ⚠️ Create a `.env` file inside the `backend/` directory and add:
```
HUGGINGFACE_API_TOKEN=your_token_here
```

---

---

## ✅ Notes

- Always activate the Python environment before running backend scripts.
- Copy the transcript response from `/transcript` and reuse it for `/analysis` and `/summary` APIs.