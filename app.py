
import numpy as np
from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import engine, create_engine, func, inspect



app = Flask(__name__)
engine = sqlalchemy.create_engine("sqlite:///nps.sqlite",echo=False)
print(inspect(engine).get_table_names())

@app.route("/")
def welcome():
  return render_template('index.html', pages = {
    "homepate": "active",
    "amenities": "",
    "activities": "",
    "weather": ""
  })

@app.route("/amenities/")
def amenitiespage():
    return render_template('amenities.html', pages = {
      "homepage": "",
      "amenities": "active",
      "activities": "",
      "weather": ""
    })

@app.route("/weather/")
def weatherpage():
    return render_template('weather.html', pages = {
      "homepage": "",
      "amenities": "",
      "activities": "",
      "weather": "active"
    })

@app.route("/activities/")
def activitiespage():
    return render_template('activities.html', pages = {
      "homepage": "",
      "amenities": "",
      "activities": "active",
      "weather": ""
    })
    
@app.route("/api/v1.0/parks")
def parks():
    
    results = engine.execute("select * from clean_df")
    return jsonify([dict(_) for _ in results])

print(inspect(engine).get_table_names())

@app.route("/api/v1.0/images")
def images():

  results = engine.execute("select * from all_images_df")
  return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/campgrounds")
def campgrounds():

    results = engine.execute("select * from camp_df")
    return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/amenities")
def amenities():
    results = engine.execute("select * from all_amenities_df")
    return jsonify([dict(_) for _ in results])

@app.route("/api/v1.0/fees")
def fees():
    results = engine.execute("select * from all_fees_df")
    return jsonify([dict(_) for _ in results])
    
@app.route("/api/v1.0/weather")
def weather():
    results = engine.execute("select * from Summary_weather_data")
    return jsonify([dict(_) for _ in results])
   
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










if __name__ =='__main__':
    app.run(debug=True)


