# 🤖 AuraChat

**A High-Performance AI Companion powered by Groq & FastAPI**

AuraChat is a sophisticated **full-stack AI chat application** designed with a sleek cyberpunk-inspired interface.
It leverages the **lightning-fast inference of Groq via LangChain** and maintains persistent conversation history using **MongoDB Atlas**.

---

# 🔗 Live Deployment

🚀 **Frontend:** https://aura-chat-kappa.vercel.app/

⚙️ **Backend API:** https://aurachat-fcn6.onrender.com/

---

# ✨ Features

* ⚡ **Near-Instant Inference**
  Powered by Groq LPU for industry-leading response times.

* 🧠 **Conversation Memory**
  Retrieves the last **4 exchanges** from MongoDB for context-aware replies.

* 🌓 **Adaptive Theme**
  Native **Dark / Light mode** with persistent storage via `localStorage`.

* 📝 **Markdown Excellence**
  Renders **tables, code blocks, and formatted text** using `react-markdown` and `remark-gfm`.

* 🛡️ **Robust Backend**
  Asynchronous **FastAPI architecture** with **Pydantic validation** and **CORS security**.

* 🎨 **Modern UI**
  Built with **React 19** and **Tailwind CSS v4**.

---

# 🛠️ Tech Stack

## Backend

* **Python (FastAPI)** – High-performance API framework
* **LangChain + Groq** – AI orchestration and LLM integration
* **MongoDB Atlas** – Chat history database
* **Pydantic** – Data validation

## Frontend

* **React (TypeScript)** – Scalable UI framework
* **Tailwind CSS** – Modern utility-first styling
* **React Markdown** – GitHub-Flavored Markdown rendering

---

# 📦 Dependencies

## Backend (Python)

* `fastapi`
* `uvicorn`
* `langchain`
* `langchain-groq`
* `pymongo`
* `python-dotenv`
* `numpy`

## Frontend (React)

* `react v19.2.0`
* `tailwindcss v4.2.1`
* `react-markdown v10.1.0`
* `remark-gfm v4.0.1`
* `typescript`
* `vite`

---

# 🚀 Local Installation

## 1️⃣ Clone the Repository

```
git clone https://github.com/mpirunthapan/AuraChat
cd AuraChat
```

---

# 2️⃣ Backend Setup

Install dependencies

```
pip install -r requirements.txt
```

Create `.env`

```
GROQ_API_KEY=your_key
MONGODB_URI=your_mongodb_connection_string
MONGO_PASSWORD=your_mongodb_password
MONGO_USER=your_mongodb_username
```

Run the server

```
uvicorn app:app --reload --host 0.0.0.0
```

Server will start at

```
http://127.0.0.1:8000
```

Swagger docs

```
http://127.0.0.1:8000/docs
```

---

# 3️⃣ Frontend Setup

```
cd frontend
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

# 💬 Chat API

### Endpoint

```
POST /chat
```

### Request

```json
{
  "user_id": "string",
  "question": "string"
}
```

### Response

```json
{
  "user_id": "user",
  "role": "user",
  "message": "Artificial intelligence (AI) refers to...",
  "timestamp": "2026-02-24T07:08:57.444+00:00"
}
```

---

# 🧠 Chat Memory

The system retrieves the **last 4 messages from MongoDB** to maintain conversation context.

This allows the AI to generate **more relevant responses based on previous messages**.

---

# 🌍 Deployment

Backend deployment:

* **Render**

Frontend deployment:

* **Vercel**

---

# 📄 License

Distributed under the **MIT License**.

---
# 👨‍💻 Author

**mpirunthapan**

* 💼 LinkedIn: https://https://www.linkedin.com/in/pirunthapan-murugaiah/
* 🐙 GitHub: https://github.com/mpirunthapan
