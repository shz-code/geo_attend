from fastapi import FastAPI

from src.routes.userRoutes import router as userRouter

app = FastAPI()


# Include Routes
app.include_router(userRouter, prefix='/users', tags=['User'])


# Root Page
@app.get("/", tags=['Root'])
async def root():
    return {"message": "Welcome to the app"}
