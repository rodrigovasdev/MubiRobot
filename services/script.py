import os
import openai
import json

preferencias_string = ''
with open('services/preferencias.json', 'r') as archivo:
    datos = json.load(archivo)
    for elemento in datos:
      preferencias_string += elemento + ', '
preferencias_string = preferencias_string.rstrip(', ')
print (preferencias_string)

openai.api_key = "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"
completion = openai.ChatCompletion.create(
  model="ft:gpt-3.5-turbo-0613:pucv::7wzCAPha",
  messages=[
    {"role": "system", "content": "Quiero que actues como un asistente experto en cine y me recomiendes 7 peliculas con sus nombres en ingles en formato json en base a las palabras que user te entregara."},
    {"role": "user", "content": preferencias_string}
  ]
)
with open('services/recomendaciones.json', 'w') as json_file:
        json.dump(completion['choices'][0]['message']['content'], json_file)
