from fastapi import APIRouter, HTTPException
from schemas.flower_schema import FlowerCreate, FlowerUpdate
from database import supabase

router = APIRouter(
    prefix="/flower",
    tags=["Flower"]
)

@router.get("/")
def get_flowers():

    response = (
        supabase
        .table("flowers")
        .select("*")
        .execute()
    )

    return response.data

@router.get("/{flower_id}")
def get_flower(flower_id: int):

    response = (
        supabase
        .table("flowers")
        .select("*")
        .eq("flower_id", flower_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Flower not found")

    return response.data[0]

@router.post("/")
def create_flower(flower: FlowerCreate):

    response = (
        supabase
        .table("flowers")
        .insert(flower.model_dump())
        .execute()
    )

    return {
        "message": "Flower created successfully",
        "data": response.data
    }

@router.put("/{flower_id}")
def update_flower(flower_id: int, flower: FlowerUpdate):

    response = (
        supabase
        .table("flowers")
        .update(flower.model_dump())
        .eq("flower_id", flower_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Flower not found")

    return {
        "message": "Flower updated successfully",
        "data": response.data
    }

@router.delete("/{flower_id}")
def delete_flower(flower_id: int):

    response = (
        supabase
        .table("flowers")
        .delete()
        .eq("flower_id", flower_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Flower not found")

    return {
        "message": "Flower deleted successfully"
    }