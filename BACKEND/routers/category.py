from fastapi import APIRouter, HTTPException
from schemas.category_schema import CategoryCreate, CategoryUpdate
from database import supabase

router = APIRouter(
    prefix="/category",
    tags=["Category"]
)

@router.get("/")
def get_categories():
    response = (
        supabase
        .table("categories")
        .select("*")
        .execute()
    )
    return response.data

@router.get("/{id}")
def get_category(id: int):

    response = (
        supabase
        .table("categories")
        .select("*")
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Category not found")

    return response.data[0]

@router.post("/")
def create_category(category: CategoryCreate):

    response = (
        supabase
        .table("categories")
        .insert(category.model_dump())
        .execute()
    )

    return {
        "message": "Category created successfully",
        "data": response.data
    }

@router.put("/{id}")
def update_category(id: int, category: CategoryUpdate):

    response = (
        supabase
        .table("categories")
        .update(category.model_dump())
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Category not found")

    return {
        "message": "Category updated successfully",
        "data": response.data
    }

@router.delete("/{id}")
def delete_category(id: int):

    response = (
        supabase
        .table("categories")
        .delete()
        .eq("id", id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Category not found")

    return {
        "message": "Category deleted successfully"
    }