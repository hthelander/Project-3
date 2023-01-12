from sqlalchemy import create_engine

# Imports the methods needed to abstract classes into tables
from sqlalchemy.ext.declarative import declarative_base

# Allow us to declare column types
from sqlalchemy import Column, Integer, String, Float 

Base = declarative_base()

engine = create_engine("sqlite:///npsdata.sqlite")
conn = engine.connect()

Base.metadata.create_all(engine)

# Create a Session Object to Connect to DB
# ----------------------------------
# Session is a temporary binding to our DB
from sqlalchemy.orm import Session
session = Session(bind=engine)

session.add("setup")

session.commit()