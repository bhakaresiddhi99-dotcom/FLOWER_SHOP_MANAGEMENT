from fastapi import APIRouter, HTTPException
from schemas.bouquet_schema import BouquetCreate, BouquetUpdate
from database import supabase

router = APIRouter(
    prefix="/bouquet",
    tags=["Bouquet"]
)

@router.get("/")
def get_bouquets():

    response = (
        supabase
        .table("bouquets")
        .select("*")
        .execute()
    )

    return response.data


@router.get("/{bouquet_id}")
def get_bouquet(bouquet_id: int):

    response = (
        supabase
        .table("bouquets")
        .select("*")
        .eq("bouquet_id", bouquet_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Bouquet not found")

    return response.data[0]


@router.post("/")
def create_bouquet(bouquet: BouquetCreate):

    response = (
        supabase
        .table("bouquets")
        .insert(bouquet.model_dump())
        .execute()
    )

    return {
        "message": "Bouquet created successfully",
        "data": response.data
    }


@router.put("/{bouquet_id}")
def update_bouquet(bouquet_id: int, bouquet: BouquetUpdate):

    response = (
        supabase
        .table("bouquets")
        .update(bouquet.model_dump())
        .eq("bouquet_id", bouquet_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Bouquet not found")

    return {
        "message": "Bouquet updated successfully",
        "data": response.data
    }


@router.delete("/{bouquet_id}")
def delete_bouquet(bouquet_id: int):

    response = (
        supabase
        .table("bouquets")
        .delete()
        .eq("bouquet_id", bouquet_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Bouquet not found")

    return {
        "message": "Bouquet deleted successfully"
    }