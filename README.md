# 🚀 AI Resume Analytics Engine

An AI-powered full-stack resume analysis platform that evaluates resumes, compares them with job descriptions, generates ATS-style scores, identifies skill gaps, and provides personalized career improvement recommendations using Large Language Models (LLMs).

Built with **React**, **TypeScript**, **FastAPI**, **MongoDB Atlas**, and **Groq API**.

---

## 🌐 Live Demo

🔗 https://agent-6a454a7295ab546345b22f3f--ai-resume0.netlify.app/

---

## 📂 GitHub Repository

🔗 https://github.com/codder-sw/AI-Resume-Analytics-Engine

---

# 📖 Overview

AI Resume Analytics Engine is a full-stack web application that helps job seekers evaluate and improve their resumes using Artificial Intelligence.

Users can upload a PDF resume along with a target job description. The application analyzes the resume using an LLM through the Groq API and provides structured feedback, including resume quality, ATS-style scoring, skill matching, missing skills, and actionable improvement suggestions.

This project demonstrates how modern AI can be integrated into real-world software engineering workflows using scalable backend architecture, cloud databases, and REST APIs.

---

# ✨ Features

- 📄 Upload Resume (PDF)
- 🤖 AI-powered Resume Analysis
- 📊 ATS-style Resume Evaluation
- 🎯 Job Description Matching
- 🧠 Skill Gap Identification
- 💡 Personalized Resume Improvement Suggestions
- ☁️ MongoDB Atlas Cloud Database
- ⚡ Fast REST API built with FastAPI
- 📱 Responsive React Frontend

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- CSS

## Backend

- Python
- FastAPI
- REST APIs

## AI

- Groq API
- Llama 3.x Language Model
- Prompt Engineering

## Database

- MongoDB Atlas

## Tools

- Git
- GitHub
- Netlify

---

# 🏗️ System Architecture

```text
                 User
                   │
                   ▼
      React + TypeScript Frontend
                   │
                   ▼
         API Service Layer (api.ts)
                   │
                   ▼
            FastAPI Backend
                   │
      ┌────────────┴────────────┐
      │                         │
      ▼                         ▼
 Resume Text Processing      Groq API (LLM)
      │
      ▼
 MongoDB Atlas
```

---

# 🔄 Application Workflow

### Step 1

User uploads

- Resume (PDF)
- Candidate Name
- Job Description

↓

### Step 2

Frontend packages the data using `FormData`.

↓

### Step 3

A POST request is sent to the FastAPI backend.

↓

### Step 4

Backend extracts text from the uploaded resume.

↓

### Step 5

Resume content and job description are sent to the Groq API.

↓

### Step 6

The LLM analyzes

- Resume quality
- ATS compatibility
- Skill matching
- Missing skills
- Resume weaknesses
- Improvement suggestions

↓

### Step 7

Analysis is stored in MongoDB Atlas.

↓

### Step 8

Results are returned to the frontend and displayed to the user.

---

# 📁 Project Structure

```
AI-Resume-Analytics-Engine
│
├── backend
│   ├── app
│   ├── routes
│   ├── services
│   ├── models
│   ├── database
│   └── main.py
│
├── public
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   │     └── api.ts
│   ├── types
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

## Frontend Setup

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

## Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI server

```bash
uvicorn main:app --reload
```

---

# 🔑 Environment Variables

## Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

---

## Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key
```

---

# 📡 API Endpoint

## Analyze Resume

```
POST /analyze
```

### Request

```
multipart/form-data
```

| Parameter | Type |
|-----------|------|
| resume | PDF |
| name | String |
| jobDescription | String |

---

### Example Response

```json
{
  "overallScore": 87,
  "skillMatch": 91,
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "strengths": [
    "Strong project experience",
    "Good technical skills"
  ],
  "suggestions": [
    "Include measurable project impact",
    "Add cloud deployment experience"
  ]
}
```

---

# 💡 Key Engineering Concepts

This project demonstrates practical implementation of

- Full Stack Development
- REST API Design
- Frontend-Backend Communication
- Cloud Database Integration
- AI-powered Resume Analysis
- Prompt Engineering
- LLM Integration
- Environment Variable Management
- Modern Software Architecture

---

# 📈 Future Roadmap

- User Authentication
- Resume History Dashboard
- Resume Version Comparison
- Resume PDF Report Export
- Cover Letter Generator
- Interview Question Generator
- Resume Keyword Optimizer
- Multiple Resume Support
- Docker Deployment
- CI/CD Pipeline
- RAG-based Resume Analysis
- Vector Database Integration

---

# 📚 What I Learned

Through this project I gained practical experience in

- Building scalable full-stack applications
- Designing REST APIs using FastAPI
- Integrating Large Language Models through Groq API
- Working with MongoDB Atlas
- Prompt Engineering
- File Upload Handling
- Cloud Deployment
- Environment Variable Management
- Frontend and Backend Integration

---

# 🙏 Acknowledgement

This project was built as a learning-focused implementation.

I took architectural inspiration from an existing open-source project to understand the overall workflow and system design. After studying the architecture, I independently recreated the application, implementing the frontend, backend integration, database connectivity, deployment, and AI workflow while using AI-assisted development tools to deepen my understanding of the technologies involved.

The objective of this project was to strengthen my understanding of full-stack development and practical AI integration through hands-on implementation.

---

# 👨‍💻 Author

**Shivam Waghule**

📧 shivamwaghule2005@gmail.com

💼 LinkedIn

https://linkedin.com/in/shivam-waghule

🐙 GitHub

https://github.com/codder-sw

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Feedback, suggestions, and contributions are always welcome!

---

## 📜 License

This project is licensed under the MIT License.
