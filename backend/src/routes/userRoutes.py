from fastapi import APIRouter, Depends
from pydantic import BaseModel

from lib.authorization import authorize

router = APIRouter()


@router.get('/')
async def getUsers():
    return {'users': []}


class UpdateLocationRequestData(BaseModel):
    lat: float
    lon: float


@router.post('/update_location')
async def updateLocation(data: UpdateLocationRequestData, user: dict = Depends(authorize)):
    lat = data.lat
    lon = data.lon
    return {'data': data}
