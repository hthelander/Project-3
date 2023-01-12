from flask import Flask, jsonify, render_template
import sqlite3
import sqlalchemy
from sqlalchemy import create_engine, inspect
from sqlalchemy import engine
from sqlalchemy.ext.automap import automap_base

app = Flask(__name__)
engine = sqlalchemy.create_engine("sqlite:///nps.sqlite",echo=False)
#connection = engine.connect()
#Base=automap_base()

print(inspect(engine).get_table_names())

@app.route("/")
def welcome():
  return render_template('weather.html',)


@app.route("/api/v1.0/weather")
def weather():
    results = engine.execute("select * from Summary_weather_data")
   #  print(inspect(engine).results)
    return jsonify([dict(_) for _ in results])
   
   # return render_template('weather.html',)
@app.route("/api/v1.0/January")
def January():
  results=engine.execute("select * from Jan_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/Feb")
def Feb():
  results=engine.execute("select * from Feb_weather_data")   
  return jsonify([dict(_) for _ in results]) 

@app.route("/api/v1.0/Mar")
def Mar():
  results=engine.execute("select * from mar_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/April")
def April():
  results=engine.execute("select * from April_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/May")
def May():
  results=engine.execute("select * from May_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/June")
def June():
  results=engine.execute("select * from June_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/July")
def July():
  results=engine.execute("select * from July_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/Aug")
def Aug():
  results=engine.execute("select * from Aug_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/Sep")
def Sep():
  results=engine.execute("select * from Sep_weather_data")   
  return jsonify([dict(_) for _ in results]) 

@app.route("/api/v1.0/Oct")
def Oct():
  results=engine.execute("select * from Oct_weather_data")   
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/Nov")
def Nov():
  results=engine.execute("select * from Nov_weather_data")   
  return jsonify([dict(_) for _ in results])

if __name__ =='__main__':
    app.run(debug=True)






