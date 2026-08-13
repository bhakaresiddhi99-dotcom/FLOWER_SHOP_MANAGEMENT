from fastapi import APIRouter, HTTPException
from schemas.order_schema import OrderCreate, OrderUpdate
from database import supabase

router = APIRouter(
    prefix="/order",
    tags=["Order"]
)

@router.get("/")
def get_orders():

    response = (
        supabase
        .table("orders")
        .select("*")
        .execute()
    )

    return response.data

@router.get("/{id}")
def get_order(id: int):

    response = (
        supabase
        .table("orders")
        .select("*")
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")

    return response.data[0]

@router.post("/")
def create_order(order: OrderCreate):

    response = (
        supabase
        .table("orders")
        .insert(order.model_dump())
        .execute()
    )

    return {
        "message": "Order created successfully",
        "data": response.data
    }

@router.put("/{id}")
def update_order(id: int, order: OrderUpdate):

    response = (
        supabase
        .table("orders")
        .update(order.model_dump())
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")

    return {
        "message": "Order updated successfully",
        "data": response.data
    }

@router.delete("/{id}")
def delete_order(id: int):

    response = (
        supabase
        .table("orders")
        .delete()
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Order not found")

    return {
        "message": "Order deleted successfully"
    }