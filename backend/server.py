from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import os
import glob

# 1. Setup App
app = FastAPI()

# Frontend ko allow karein (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. OpenAI API Setup (Yahan Apni Key Dalein)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# 3. Aapki Book ka Content Load Karna (Same as before)
def load_book_content():
    content = ""
    # Docs folder se saari markdown files parh lo
    files = glob.glob("../physical-ai-book/docs/**/*.md", recursive=True)
    for file in files:
        with open(file, "r", encoding="utf-8") as f:
            content += f.read() + "\n\n"
    return content[:20000] # OpenAI ke liye content limit (Tokens bachane ke liye)

book_context = load_book_content()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        # 4. OpenAI ko Bhejo
        response = client.chat.completions.create(
            model="gpt-4o-mini", # Ye Model BOHOT TEZ hai ⚡
            messages=[
                {"role": "system", "content": "You are a helpful AI Assistant for a 'Physical AI & Robotics' textbook. Use the provided book content to answer questions."},
                {"role": "user", "content": f"Book Content:\n{book_context}\n\nStudent Question: {req.message}"}
            ]
        )
        
        # Jawab Nikalo
        return {"reply": response.choices[0].message.content}
    
    except Exception as e:
        return {"reply": "Server Error: " + str(e)}

# Run: uvicorn server:app --reload