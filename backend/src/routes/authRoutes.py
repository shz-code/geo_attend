from fastapi import APIRouter
from pydantic import BaseModel, field_validator, validator

from lib.jwt import generate_jwt_token

router = APIRouter()


class LoginRequestData(BaseModel):
    email: str
    password: str


@router.post('/login')
async def login(data: LoginRequestData):
    email = data.email
    password = data.password

    if email == "admin@gmail.com" and password == "1234":
        jwt_token = generate_jwt_token(data={'email': email})
        return {'success': True, 'token': jwt_token}
    return {'success': False}
