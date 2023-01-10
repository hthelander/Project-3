import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify 

engine = create_engine("sqlite:///npstest.sqlite")

Base = automap_base

Base.prepare(engine, reflect = True)

parkdata = Base.classes.parkdata

app = Flask(__name__)

@app.route("/")
def parks():
    session = Session(engine)
    results = session.query()