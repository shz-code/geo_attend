from fastapi import APIRouter

router = APIRouter()


@router.get('/')
async def getUsers():
    return {'users': []}
