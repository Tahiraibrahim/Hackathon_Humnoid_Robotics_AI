import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am the Physical AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    const currentInput = input;
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      // Backend API Call
      const res = await axios.post("/api/chat", { 
  message: currentInput 
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      const botReply = res.data.reply || res.data.response || "No response received from the server.";
      const botMessage = { sender: "bot", text: botReply };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Sorry, unable to connect to the server. (Backend Error)" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Floating Button */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        {open ? "❌ Close" : "💬 AI Chat"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            <strong>🤖 AI Assistant</strong>
          </div>
          
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="bubble bot"><em>Typing...</em></div>}
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}