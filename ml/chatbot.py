import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request

load_dotenv()

app = Flask(__name__)

genAIapi = os.getenv('gem')
genai.configure(api_key=genAIapi)

generation_config = {
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction='''
        You are a specialized AI assistant trained exclusively in the field of 
        medicine. Your role is to provide accurate and reliable answers only 
        to medical-related questions. Please refrain from responding to questions 
        outside the scope of medical knowledge, such as general knowledge, 
        personal opinions, or unrelated topics. If a question is not relevant 
        to medicine, kindly reply with, 'I can only assist with medical-related 
        inquiries.' Ensure that all your responses are concise, evidence-based, 
        and aligned with current medical guidelines. 
        Elaborate every point of every answer as much as possible.
    '''
)

chat_history = []

def generate_response(question):
    global chat_history
    
    chat_history.append({
        "role": "user",
        "parts": [question]
    })
    
    try:
        chat_session = model.start_chat(history=chat_history)
        response = chat_session.send_message(question)
        
        chat_history.append({
            "role": "model",
            "parts": [response.text]
        })
        
        json_response = {
            "prompt": question,
            "response": response.text,
        }
        return json_response
    except Exception as e:
        return {'error': f"Failed to generate or parse model response: {str(e)}"}, 500

if __name__ == '__main__':
    app.run(debug=True)
