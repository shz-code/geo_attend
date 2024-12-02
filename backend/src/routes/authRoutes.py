from fastapi import APIRouter
from pydantic import BaseModel, field_validator, validator

router = APIRouter()


class LoginRequestData(BaseModel):
    email: str
    password: str


@router.post('/login')
async def login(data: LoginRequestData):
    email = data.email
    password = data.password

    if email == "admin@gmail.com" and password == "1234":
        return {'success': True}
    return {'success': False}
