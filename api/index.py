from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# CORS: Allow Vercel Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key (Vercel Environment Variable se lega)
# Agar yahan error aaye to apni Key temporarily hardcode kar sakti hain
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY")) 

# Book Content (Hardcoded for Vercel Speed)
# Kyunke Vercel file system read karne mein issue karta hai, 
# isliye hum thora sa content yahin daal dete hain.
book_context = """
This is a Physical AI & Robotics Textbook.
Key Concepts:
1. Embodied Intelligence: AI that has a physical body (Robot).
2. ROS 2: Robot Operating System used to control motors and sensors.
3. Isaac Sim: NVIDIA's tool for simulating robots (Digital Twins).
4. Unitree Go1: A quadruped robot dog used for real-world testing.
5. VLA (Vision-Language-Action): Using AI models to translate voice commands into robot actions.
"""

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat") # <-- Path change kiya hai
async def chat_endpoint(req: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful AI Assistant for a Robotics book."},
                {"role": "user", "content": f"Context: {book_context}\n\nQuestion: {req.message}"}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        return {"reply": "Server Error: " + str(e)}