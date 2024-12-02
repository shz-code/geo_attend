from fastapi import FastAPI

from src.routes.userRoutes import router as userRouter
from src.routes.authRoutes import router as authRouter

app = FastAPI()


# Include Routes
app.include_router(userRouter, prefix='/users', tags=['User'])
app.include_router(authRouter, prefix='/auth', tags=['Auth'])


# Root Page
@app.get("/", tags=['Root'])
async def root():
    return {"message": "Welcome to the app"}
