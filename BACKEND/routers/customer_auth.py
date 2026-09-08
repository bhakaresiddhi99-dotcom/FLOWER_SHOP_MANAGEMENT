from fastapi import APIRouter, HTTPException
from schemas.customer_auth_schema import CustomerRegister, CustomerLogin
from database import supabase

router = APIRouter(
    prefix="/customer-auth",
    tags=["Customer Authentication"]
)


@router.post("/register/")
def register_customer(data: CustomerRegister):

    # Check if email already exists
    existing_customer = (
        supabase.table("customers")
        .select("id, email")
        .eq("email", data.email)
        .execute()
    )

    if existing_customer.data:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Create customer
    customer_response = (
        supabase.table("customers")
        .insert({
            "customer_name": data.customer_name,
            "email": data.email,
            "phone": data.phone,
            "address": data.address
        })
        .execute()
    )

    if not customer_response.data:
        raise HTTPException(
            status_code=500,
            detail="Customer registration failed"
        )

    customer_id = customer_response.data[0]["id"]

    # Store password in customer_auth table
    auth_response = (
        supabase.table("customer_auth")
        .insert({
            "customer_id": customer_id,
            "password": data.password
        })
        .execute()
    )

    if not auth_response.data:
        raise HTTPException(
            status_code=500,
            detail="Customer authentication setup failed"
        )

    return {
        "success": True,
        "message": "Customer registered successfully"
    }


@router.post("/login/")
def login_customer(data: CustomerLogin):

    customer_response = (
        supabase.table("customers")
        .select("id, customer_name, email, phone, address")
        .eq("email", data.email)
        .execute()
    )

    if not customer_response.data:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    customer = customer_response.data[0]

    auth_response = (
        supabase.table("customer_auth")
        .select("password")
        .eq("customer_id", customer["id"])
        .execute()
    )

    if not auth_response.data:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    if auth_response.data[0]["password"] != data.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    return {
        "success": True,
        "message": "Login Successful",
        "customer": customer
    }