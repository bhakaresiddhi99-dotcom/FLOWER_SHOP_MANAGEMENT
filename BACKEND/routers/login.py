from fastapi import APIRouter, HTTPException
from schemas.login_schema import LoginRequest
from database import supabase

router = APIRouter(
    prefix="/login",
    tags=["Login"]
)

@router.post("/")
def login(data: LoginRequest):

    email = data.email
    password = data.password

    response = (
        supabase.table("admin")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .execute()
    )

    if response.data:
        return {
            "success": True,
            "message": "Login Successful",
            "admin": response.data[0]
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid Email or Password"
    )