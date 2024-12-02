from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from lib.jwt import decode_jwt_token

# HTTPBearer for extracting the Authorization header
security = HTTPBearer()


# Dependency to validate JWT token
async def authorize(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = decode_jwt_token(token)
        return payload
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
