#uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Pathfinder Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # local development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TeleopCommand(BaseModel):
    linear: int = Field(..., ge=-1, le=1)
    angular: int = Field(..., ge=-1, le=1)


@app.get("/")
def root():
    return {"message": "Pathfinder backend running"}


@app.post("/teleop")
def teleop(command: TeleopCommand):
    print(f"TELEOP COMMAND -> linear: {command.linear}, angular: {command.angular}")

    return {
        "status": "received",
        "linear": command.linear,
        "angular": command.angular,
    }

