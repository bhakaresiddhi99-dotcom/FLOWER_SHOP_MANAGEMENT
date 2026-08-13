from fastapi import APIRouter, HTTPException
from schemas.order_item_schema import OrderItemCreate, OrderItemUpdate
from database import supabase

router = APIRouter(
    prefix="/order-item",
    tags=["Order Item"]
)

# GET ALL
@router.get("/")
def get_order_items():

    response = (
        supabase
        .table("order_items")
        .select("*")
        .execute()
    )

    return response.data


# GET BY ID
@router.get("/{id}")
def get_order_item(id: int):

    response = (
        supabase
        .table("order_items")
        .select("*")
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Order Item not found")

    return response.data[0]


# CREATE
@router.post("/")
def create_order_item(item: OrderItemCreate):

    print(item.model_dump())

    response = (
        supabase
        .table("order_items")
        .insert(item.model_dump())
        .execute()
    )

    return {
        "message": "Order Item created successfully",
        "data": response.data
    }


# UPDATE
@router.put("/{id}")
def update_order_item(id: int, item: OrderItemUpdate):

    response = (
        supabase
        .table("order_items")
        .update(item.model_dump())
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Order Item not found")

    return {
        "message": "Order Item updated successfully",
        "data": response.data
    }


# DELETE
@router.delete("/{id}")
def delete_order_item(id: int):

    response = (
        supabase
        .table("order_items")
        .delete()
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Order Item not found")

    return {
        "message": "Order Item deleted successfully"
    }