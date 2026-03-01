import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import MessagesPlaceholder
from pymongo import MongoClient
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
mongo_uri = os.getenv("MONGODB_URI")

client = MongoClient(mongo_uri)
db = client["chatbot"]
collection = db["users"]

app = FastAPI()

class ChatRequest(BaseModel):
    user_id: str
    question: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

prompt = ChatPromptTemplate.from_messages(
        [
            ("system", 
            "You are ChatGPT, a friendly, professional, and knowledgeable AI assistant. "
            "Answer naturally like a human expert. Use short paragraphs and bullet points only when helpful. "
            "Avoid tables. Keep responses clear, conversational, and engaging."
            ),
            MessagesPlaceholder(variable_name="history"),
            ("user", "{question}")
        ]
    )

llm = ChatGroq(api_key = groq_api_key, model="openai/gpt-oss-20b")
chain = prompt | llm

def get_chat_history(user_id):
    chats = collection.find({"user_id": user_id}).sort("timestamp", -1).limit(4)

    history = []
    for chat in reversed(list(chats)):
        if chat["role"] == "user":
            history.append(HumanMessage(content=chat["message"]))
        else:
            history.append(AIMessage(content=chat["message"]))

    return history

@app.get("/")
def home():
    return {"message": "Welcome to the Chatbot API!"}

@app.post("/chat")
def chat(request: ChatRequest):
    history = get_chat_history(request.user_id)

    response = chain.invoke({"history": history, "question": request.question})

    collection.insert_one(
        {
            "user_id": request.user_id,
            "role": "user",
            "message": request.question, 
            "timestamp": datetime.utcnow()
        }
    )

    collection.insert_one(
        {
            "user_id": request.user_id,
            "role": "assistant",
            "message": response.content, 
            "timestamp": datetime.utcnow()
        }
    )

    return {
    "status": "success",
    "answer": response.content,
    "timestamp": datetime.utcnow().isoformat()
}

