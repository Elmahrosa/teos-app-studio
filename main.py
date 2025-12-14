from fastapi import FastAPI
from routers import health

app = FastAPI(title="TEOS API Orchestrator")

app.include_router(health.router)
