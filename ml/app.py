from flask import Flask, request, jsonify
import pickle
import numpy as np
from prediction import predict_disease, specialist_assign
from chatbot import generate_response
from report import generate_analysis

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    symptoms = data.get('symptoms', [])
    
    if not symptoms or not isinstance(symptoms, list):
        return jsonify({"error": "No symptoms provided or invalid format"}), 400

    predicted_disease = predict_disease(symptoms)
    recommended_specialist = specialist_assign(predicted_disease)
    response = {
        "disease": predicted_disease,
        "specialist": recommended_specialist
    }
    
    return jsonify(response)
    
@app.route('/chat',methods=['POST'])
def chat():
    data=request.get_json()
    question=data.get('question','')
    
    response=generate_response(question)
    return jsonify(response)

@app.route('/summarize',methods=['POST'])
def analyse():
    if 'report' not in request.files:
        return jsonify({'error': 'report field is missing'}), 400
    
    file=request.files['report']
    prompt = request.form["prompt"]
    
    response=generate_analysis(file,prompt)
    
    return response

if __name__ == '__main__':
    app.run(debug=True)
