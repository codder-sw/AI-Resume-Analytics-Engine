# 🚀 AI Resume Analytics Engine

An AI-powered full-stack resume analysis platform that evaluates resumes, compares them with job descriptions, generates ATS-style scores, identifies skill gaps, and provides personalized career improvement recommendations using Generative AI.

> Built using **React**, **TypeScript**, **FastAPI**, **MongoDB Atlas**, and **Google Gemini API**.

---

## 🌐 Live Demo

🔗 https://agent-6a454a7295ab546345b22f3f--ai-resume0.netlify.app/

---

## 📂 GitHub Repository

🔗 https://github.com/codder-sw/AI-Resume-Analytics-Engine

---

# 📖 Overview

Recruiters receive thousands of resumes every day, while candidates often struggle to understand why their resumes are rejected.

AI Resume Analytics Engine bridges this gap by using Generative AI to analyze resumes, compare them with job descriptions, identify missing skills, and provide actionable recommendations to improve interview readiness.

The project demonstrates the integration of modern full-stack development with Large Language Models (LLMs) to solve a real-world problem.

---

# ✨ Features

- 📄 Upload Resume (PDF)
- 🤖 AI-powered Resume Analysis
- 📊 ATS-style Resume Scoring
- 🎯 Job Description Matching
- 🧠 Skill Gap Identification
- 💡 Personalized Improvement Suggestions
- ☁️ Cloud Database Integration
- ⚡ Fast REST APIs
- 📱 Responsive User Interface

---

# 🏗️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- CSS

---

## Backend

- Python
- FastAPI
- REST API

---

## AI

- Google Gemini API
- Prompt Engineering

---

## Database

- MongoDB Atlas

---

## Tools

- Git
- GitHub
- Netlify

---

# 🏛️ System Architecture

```
                   User
                     │
                     ▼
          React + TypeScript
                     │
                     ▼
          services/api.ts
                     │
                     ▼
             FastAPI Backend
                     │
      ┌──────────────┴──────────────┐
      │                             │
      ▼                             ▼
 Resume Processing          Gemini API
      │
      ▼
 MongoDB Atlas
```

---

# 🔄 Application Workflow

### Step 1

User uploads

- Resume (PDF)
- Name
- Job Description

↓

### Step 2

Frontend creates

```
FormData
```

↓

### Step 3

FastAPI receives

```
POST /analyze
```

↓

### Step 4

Backend extracts resume text

↓

### Step 5

Resume + Job Description

↓

Sent to Gemini API

↓

### Step 6

Gemini analyzes

- Resume Quality
- ATS Score
- Skills
- Missing Skills
- Suggestions

↓

### Step 7

Analysis stored in MongoDB Atlas

↓

### Step 8

Results returned to frontend

↓

User receives AI-generated insights.

---

# 📁 Project Structure

```
AI-Resume-Analytics-Engine/

│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── main.py
│
├── public/
│
├── src/
│   ├── components/
│   ├── services/
│   │     └── api.ts
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/codder-sw/AI-Resume-Analytics-Engine.git

cd AI-Resume-Analytics-Engine
```

---

## Frontend

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

---

## Backend

Navigate

```bash
cd backend
```

Install

```bash
pip install -r requirements.txt
```

Run

```bash
uvicorn main:app --reload
```

---

# 🔑 Environment Variables

## Frontend

Create

```
.env
```

```
VITE_API_URL=http://localhost:8000
```

---

## Backend

Create

```
.env
```

```
MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_google_gemini_api_key
```

---

# 📊 API Endpoint

## Analyze Resume

```
POST /analyze
```

### Request

```
multipart/form-data
```

Parameters

| Field | Type |
|--------|------|
| resume | PDF |
| name | String |
| jobDescription | String |

---

### Response

Example

```json
{
  "overallScore": 88,
  "skillMatch": 91,
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "suggestions": [
    "Add cloud deployment projects",
    "Highlight measurable achievements"
  ]
}
```

---

# 💡 Why This Project?

This project demonstrates practical implementation of:

- Full Stack Development
- REST API Design
- Cloud Database Integration
- AI Application Development
- Prompt Engineering
- LLM Integration
- Resume Parsing Workflow
- Modern Software Architecture

---

# 🚀 Future Improvements

- User Authentication
- Resume History
- Resume Version Comparison
- Multiple Resume Support
- AI Chat Assistant
- Cover Letter Generator
- Interview Question Generator
- Resume Keyword Optimization
- PDF Report Download
- Multi-language Support
- Docker Deployment
- CI/CD Pipeline
- RAG-based Resume Analysis
- Vector Database Integration

---

# 📚 Learning Outcomes

Through this project, I gained practical experience in:

- Building scalable full-stack applications
- Designing REST APIs
- Integrating Generative AI into real-world applications
- Working with MongoDB Atlas
- Prompt Engineering
- Frontend-Backend Communication
- Environment Variable Management
- Cloud Deployment

---

# 🙏 Acknowledgement

This project was developed as a learning-focused implementation.

I took inspiration and architectural reference from an open-source project to understand the overall workflow and system design. After studying the architecture, I recreated and implemented the application independently, including the frontend, backend integration, database setup, API communication, deployment, and AI workflow while using AI-assisted development tools to deepen my understanding of the technologies involved.

---

# 👨‍💻 Author

**Shivam Waghule**

📧 shivamwaghule2005@gmail.com

🔗 LinkedIn

https://linkedin.com/in/shivam-waghule

🐙 GitHub

https://github.com/codder-sw

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
