from pymongo import MongoClient
from flask import Flask, jsonify, request
import json
from bson import json_util
import random
from bson.json_util import dumps
from flask_cors import CORS
import subprocess
import re
import requests

app = Flask(__name__)
CORS(app)
# Conecta con la base de datos MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['recomenbot-db']
collection = db['preguntas']

# Itera sobre los resultados e imprímelos


@app.route('/api/preguntas', methods = ['GET'])
def get_3_random_preguntas():
    # Realizar la consulta en MongoDB
    peliculas_aleatorios = collection.aggregate([{ '$sample': { 'size': 5 } },{
            '$project': {
                '_id': 0,
                'pregunta': 1,  # Proyectar el valor del campo aleatorio
                'respuestas': 1  # Proyectar el vectorCampo
            }
    }])
    resultados_finales = []
    for documento in peliculas_aleatorios:
        # Barajar los elementos del vectorCampo
        vector_barajado = random.sample(documento['respuestas'], len(documento['respuestas']))
        
        # Actualizar el documento con el vector barajado
        documento['respuestas'] = vector_barajado

        # Agregar el documento resultante a la lista
        resultados_finales.append(documento)
    
    resultado_json = dumps(resultados_finales)
    # Devolver la lista en formato JSON
    return resultado_json


def formatear_para_query(string_a_buscar):
    # Reemplaza los espacios con '%20' para formatear el string para una URL
    string_formateado = string_a_buscar.replace(' ', '%20')
    string_formateado = string_formateado.replace("'", '%27')
    
    # Construye la URL de la consulta
    url_query = f"https://api.themoviedb.org/3/search/movie?query={string_formateado}&include_adult=false&language=es-ES&page=1"
    
    return url_query



def funcion(pelicula):
    print(formatear_para_query(pelicula))
    url = formatear_para_query(pelicula)

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk3M2Y5M2VlMzhhZDlhNzBkNmMxZTdjMTRkY2Y3MiIsInN1YiI6IjY0ZmNlMzgyNmEyMjI3MDBjM2I0MzZiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._pIciPiLlGtbhyeFUKwBpaiS-wJ9OVocacR6c4BSF8s"
    }
    response = requests.get(url, headers=headers)
    ##print(response.text)
    if response.status_code == 200:

            # Convierte la respuesta JSON a un diccionario
            datos = response.json()

            # Accede a los campos dentro del objeto JSON
            page = datos.get('page', None)
            
            # Accede a la lista de resultados y toma el primer elemento (índice 0)
            primer_resultado = datos.get('results', [])[0] 

            # Accede a los campos dentro del primer resultado
            titulo = primer_resultado.get('title', None)
            descripcion = primer_resultado.get('overview', None)
            fecha_lanzamiento = primer_resultado.get('release_date', None)
            poster = primer_resultado.get('poster_path', None)
            print (titulo, descripcion)
            nueva_pelicula = {
                "titulo": titulo,
                "descripcion": descripcion, # Puedes agregar más atributos aquí
                "fecha": fecha_lanzamiento,
                "poster": poster
            }
            print(nueva_pelicula)
    return(nueva_pelicula)




@app.route('/api/post/preferencias', methods = ['POST'])
def postJsonHandler():
    peliculas_formateadas = []
    content = request.get_json()
    with open('services/preferencias.json', 'w') as json_file:
        json.dump(content, json_file)
    # llama tu archivo.py
    subprocess.call("python services/script.py", shell=True)
    # asegurate que archivo.py genera archivo2
    with open("services/recomendaciones.json") as archivo2:
        datos_s = archivo2.read()
    ##datos_s = datos_s.replace("'", "\"")
    ##datos_dict = json.loads(datos_s)
    matches = re.findall(r"'pelicula \d+': '[^']*'", datos_s)
    #(r"'pelicula \d+': '[\w\s\\']+'", datos_s)
    print ('este es el tipo de dato ')
    print (type(matches))
    print (matches)
    for match in matches:
    # Separamos la película y el título
        pelicula, titulo = match.split(': \'')
    # Limpiamos los strings
        pelicula = pelicula.strip("'")
        titulo = titulo.strip("'")
        peliculas_formateadas.append(funcion(titulo)) 
    return (jsonify(peliculas_formateadas))
if __name__ == '__main__':
    app.run(debug=True)