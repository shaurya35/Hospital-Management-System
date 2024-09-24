import numpy as np
from config import columns, specialist_mapping
import pickle

with open('pipe_knn.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
    
   
def predict_disease(symptoms):
    input=np.zeros(len(columns))
    
    for symptom in symptoms:
        if symptom in symptoms:
            input[columns.index(symptom)]=1
        
    prediction=model.predict([input])[0]
    return prediction

def specialist_assign(disease):
    disease=disease.replace(" ","").lower()
    return specialist_mapping.get(disease,"General Physician")

