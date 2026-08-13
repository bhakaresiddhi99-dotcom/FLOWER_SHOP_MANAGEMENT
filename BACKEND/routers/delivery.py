from fastapi import APIRouter, HTTPException
from schemas.delivery_schema import DeliveryCreate, DeliveryUpdate
from database import supabase

router = APIRouter(
    prefix="/delivery",
    tags=["Delivery"]
)

@router.get("/")
def get_deliveries():

    response = (
        supabase
        .table("delivery")
        .select("*")
        .execute()
    )

    return response.data


@router.get("/{delivery_id}")
def get_delivery(delivery_id: int):

    response = (
        supabase
        .table("delivery")
        .select("*")
        .eq("delivery_id", delivery_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Delivery not found")

    return response.data[0]


@router.post("/")
def create_delivery(delivery: DeliveryCreate):

    response = (
        supabase
        .table("delivery")
        .insert(delivery.model_dump())
        .execute()
    )

    return {
        "message": "Delivery created successfully",
        "data": response.data
    }


@router.put("/{delivery_id}")
def update_delivery(delivery_id: int, delivery: DeliveryUpdate):

    response = (
        supabase
        .table("delivery")
        .update(delivery.model_dump())
        .eq("delivery_id", delivery_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Delivery not found")

    return {
        "message": "Delivery updated successfully",
        "data": response.data
    }


@router.delete("/{delivery_id}")
def delete_delivery(delivery_id: int):

    response = (
        supabase
        .table("delivery")
        .delete()
        .eq("delivery_id", delivery_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Delivery not found")

    return {
        "message": "Delivery deleted successfully"
    }