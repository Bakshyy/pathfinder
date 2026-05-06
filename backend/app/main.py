from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home(): 
    hi = 'hi'
    return {hi}



