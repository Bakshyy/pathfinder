#uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home(): 
    hi = 'hi'
    return {hi}



