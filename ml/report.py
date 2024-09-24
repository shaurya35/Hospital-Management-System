from flask import jsonify
import pymupdf
import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()

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
)

chat_history = []


def generate_analysis(file,input_prompt):
    global chat_history
    pdf_text = extract_text(file)
    one_shot_prompt = f"""You are a specialist in interpreting lab test reports. Your role is to analyze the provided lab test report and assist with 
                        related inquiries. Start by summarizing the key findings and notable observations from the report in bulleted points.
                        Elaborate the summary as much as possible and make sure the number of words in the summary is at least 5000.
                        When answering questions, focus exclusively on the information contained within the report and apply relevant medical 
                        knowledge as needed. 
                        Additionally, offer practical advice on steps the patient can take to maintain or improve their health 
                        based on the report’s findings. This may include lifestyle adjustments, dietary 
                        changes, or follow-up actions. Ensure that all responses are clear, accurate, and directly related to the lab test report.
                        Remember the report is of the person talking to you, so address the person mentioned in the report as "you" and 
                        other second person pronouns as seems fit.
                        Elaborate every point of every answer as much as possible.
                        Also explain all the difficult medical terms, within paranthesis beside that term when if used, that common people wouldn't know.
                        Based on the following text written after document text, please answer the question written after 'Question':\n\nDocument Text:\n{pdf_text}\n\nQuestion: {input_prompt}"""
    chat_history.append(
        {"role": "user", "parts": [one_shot_prompt]}
    )
    try:
        chat_session = model.start_chat(history=chat_history)
        response = chat_session.send_message(one_shot_prompt)
        
        chat_history.append({
            "role": "model",
            "parts": [response.text]
        })
        
        json_response = {
            "prompt": input_prompt,
            "response": response.text,
        }
        return jsonify(json_response)
    except Exception as e:
        return jsonify({'error': f"Failed to generate or parse model response: {str(e)}"}), 500
    

def extract_text(file):
    pdf = pymupdf.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in pdf:
        text += page.get_text()
    pdf.close()
    return text
