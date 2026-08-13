from fastapi import APIRouter, HTTPException
from schemas.admin_schema import AdminCreate, AdminUpdate
from database import supabase

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

# GET ALL
@router.get("/")
def get_admins():
    response = supabase.table("admin").select("*").execute()
    return response.data


# GET BY ID
@router.get("/{admin_id}")
def get_admin(admin_id: int):
    response = (
        supabase.table("admin")
        .select("*")
        .eq("admin_id", admin_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Admin not found")

    return response.data[0]


# CREATE
@router.post("/")
def create_admin(admin: AdminCreate):
    response = (
        supabase.table("admin")
        .insert(admin.model_dump())
        .execute()
    )

    return {
        "message": "Admin created successfully",
        "data": response.data
    }


# UPDATE
@router.put("/{admin_id}")
def update_admin(admin_id: int, admin: AdminUpdate):

    response = (
        supabase.table("admin")
        .update(admin.model_dump())
        .eq("admin_id", admin_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Admin not found")

    return {
        "message": "Admin updated successfully",
        "data": response.data
    }


# DELETE
@router.delete("/{admin_id}")
def delete_admin(admin_id: int):

    response = (
        supabase.table("admin")
        .delete()
        .eq("admin_id", admin_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Admin not found")

    return {
        "message": "Admin deleted successfully"
    }