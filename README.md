# 🤖 Kenmark ITan Solutions – AI Chatbot  
**NMIMS Intern Technical Assignment**

---

## 📌 Project Overview

This project is a **full-stack AI-powered chatbot** developed for the official website of **Kenmark ITan Solutions**.  
The chatbot acts as a **virtual assistant**, answering user queries related to:

- Company information  
- Services offered  
- Contact details  
- FAQs  

It uses a **Retrieval-Augmented Generation (RAG)** approach, combining a structured knowledge base with AI-generated responses to ensure **accuracy, relevance, and zero hallucination**.

🌐 **Target Website:** https://kenmarkitan.com  

---

## 🎯 Objectives Achieved

- Understand user queries
- Retrieve relevant information from a structured knowledge base
- Generate intelligent, contextual AI responses
- Provide a clean and responsive chat interface
- Demonstrate real-world backend + AI architecture

---

## 🧠 System Architecture

User (Browser)
↓
Next.js Frontend (Vercel)
↓
Express Backend API (Render)
↓
MongoDB Atlas (Knowledge Base)
↓
Groq AI (compound-mini model)

yaml
Copy code

---

## 🛠️ Tech Stack Used

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Deployment: **Vercel**

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Groq AI SDK
- Deployment: **Render**

### AI & Data
- Groq LLM (`groq/compound-mini`)
- Retrieval-Augmented Generation (RAG)
- Knowledge stored in MongoDB
- Source data structured from Excel (.xlsx)

---

## 📚 Knowledge Base Structure

The chatbot answers only from structured knowledge stored in MongoDB.

**Excel Format Used:**

| Category | Question | Answer |
|--------|----------|--------|
| About | What is Kenmark ITan Solutions? | Kenmark ITan Solutions is a technology company focused on… |
| Services | What services do you offer? | AI consulting, training, etc. |
| Contact | How can I contact the company? | Visit the contact page on kenmarkitan.com |

---

## ⚙️ Backend Logic (RAG Flow)

1. User sends a message
2. Backend retrieves all knowledge entries
3. Keyword-based fuzzy matching finds the best answer
4. Matched knowledge is sent as context to AI
5. AI refines the response
6. If no match is found, a safe fallback message is returned

> ❗ The chatbot **never answers outside the knowledge base**

---

## 🚀 Live Deployment

### 🔗 Frontend (Vercel)
**Live Demo URL:**  
https://<your-vercel-project>.vercel.app

markdown
Copy code

### 🔗 Backend API (Render)
**Base URL:**  
https://kenmark-chatbot-1n4g.onrender.com

markdown
Copy code

**Test Endpoint:**
POST /chat
Content-Type: application/json

{
"message": "What services do you offer?"
}

yaml
Copy code

---

## 🧪 How to Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/PIYUSHhh44/kenmark-chatbot.git
cd kenmark-chatbot
2️⃣ Backend Setup
bash
Copy code
cd server
npm install
Create .env file:

env
Copy code
DATABASE_URL=your_mongodb_atlas_url
GROQ_API_KEY=your_groq_api_key
PORT=4000
Run backend:

bash
Copy code
node server.js
3️⃣ Frontend Setup
bash
Copy code
cd ..
npm install
npm run dev
🔐 Environment Variables
Backend (Render)
DATABASE_URL

GROQ_API_KEY

PORT

Frontend (Vercel)
No sensitive keys exposed

Backend URL is called directly from frontend

⭐ Bonus Features Implemented
Session-based chat history

Polite fallback responses

Modular frontend–backend separation

Floating chatbot UI

Production-ready deployment

🧪 Sample Chatbot Interaction
User: What services do you offer?
Bot: Kenmark ITan Solutions offers AI consulting, professional training, and technology solutions tailored to business needs.

📊 Evaluation Alignment
Criteria	Status
Functionality (Chat + AI)	✅
Code Quality	✅
UI/UX	✅
Architecture	✅
Deployment	✅
Documentation	✅

👤 Author
Name: Piyush Anil Patil
Program: NMIMS Internship Program
Assignment: Website AI Chatbot – Kenmark ITan Solutions

📌 Notes
AI responses are strictly grounded in stored knowledge

No hallucinated or external data is used

Designed for scalability and real-world deployment
