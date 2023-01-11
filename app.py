
import numpy as np
from flask import Flask, jsonify, render_template


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect



engine = create_engine("sqlite:///nps.sqlite")

Base = automap_base()

Base.prepare(engine, reflect = True)

print(Base.classes.keys())

print(inspect(engine).get_table_names())



# parkdata = Base.classes.clean_df

app = Flask(__name__)

@app.route("/")
def api_routes():
    return ( 
        f"/api/v1.0/parks<br/>"
        f"/api/v1.0/weather"
    )

    
@app.route("/api/v1.0/parks")
def parks():
    
    results = engine.execute("select * from clean_df")
    

    return jsonify([dict(_) for _ in results])



if __name__ =='__main__':
    app.run(debug=True)


