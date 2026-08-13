from fastapi import APIRouter, HTTPException
from schemas.inventory_schema import InventoryCreate, InventoryUpdate
from database import supabase

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)

@router.get("/")
def get_inventory():

    response = (
        supabase
        .table("inventory")
        .select("*")
        .execute()
    )

    return response.data


@router.get("/{inventory_id}")
def get_inventory_by_id(inventory_id: int):

    response = (
        supabase
        .table("inventory")
        .select("*")
        .eq("inventory_id", inventory_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Inventory not found")

    return response.data[0]


@router.post("/")
def create_inventory(inventory: InventoryCreate):

    response = (
        supabase
        .table("inventory")
        .insert(inventory.model_dump())
        .execute()
    )

    return {
        "message": "Inventory created successfully",
        "data": response.data
    }


@router.put("/{inventory_id}")
def update_inventory(inventory_id: int, inventory: InventoryUpdate):

    response = (
        supabase
        .table("inventory")
        .update(inventory.model_dump())
        .eq("inventory_id", inventory_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Inventory not found")

    return {
        "message": "Inventory updated successfully",
        "data": response.data
    }


@router.delete("/{inventory_id}")
def delete_inventory(inventory_id: int):

    response = (
        supabase
        .table("inventory")
        .delete()
        .eq("inventory_id", inventory_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Inventory not found")

    return {
        "message": "Inventory deleted successfully"
    }