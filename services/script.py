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
    {"role": "system", "content": "Quiero que actues como un asistente experto en cine y me recomiendes 10 peliculas con sus nombres en ingles en formato json en base a las palabras que user te entregara."},
    {"role": "user", "content": preferencias_string}
  ]
)
with open('services/recomendaciones.json', 'w') as json_file:
        json.dump(completion['choices'][0]['message']['content'], json_file)
