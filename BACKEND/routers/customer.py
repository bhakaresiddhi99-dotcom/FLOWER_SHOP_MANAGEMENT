from fastapi import APIRouter, HTTPException
from schemas.customer_schema import CustomerCreate, CustomerUpdate
from database import supabase

router = APIRouter(
    prefix="/customer",
    tags=["Customer"]
)

@router.get("/")
def get_customers():
    response = supabase.table("customers").select("*").execute()
    return response.data

@router.get("/{id}")
def get_customer(id: int):
    response = (
        supabase.table("customers")
        .select("*")
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Customer not found")

    return response.data[0]

@router.post("/")
def create_customer(customer: CustomerCreate):
    response = (
        supabase.table("customers")
        .insert(customer.model_dump())
        .execute()
    )

    return {
        "message": "Customer created successfully",
        "data": response.data
    }

@router.put("/{id}")
def update_customer(id: int, customer: CustomerUpdate):
    response = (
        supabase.table("customers")
        .update(customer.model_dump())
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Customer not found")

    return {
        "message": "Customer updated successfully",
        "data": response.data
    }

@router.delete("/{id}")
def delete_customer(id: int):
    response = (
        supabase.table("customers")
        .delete()
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Customer not found")

    return {
        "message": "Customer deleted successfully"
    }