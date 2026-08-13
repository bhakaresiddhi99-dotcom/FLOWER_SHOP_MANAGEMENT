from fastapi import APIRouter, HTTPException
from schemas.payment_schema import PaymentCreate, PaymentUpdate
from database import supabase

router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)

@router.get("/")
def get_payments():

    response = (
        supabase
        .table("payments")
        .select("*")
        .execute()
    )

    return response.data


@router.get("/{payment_id}")
def get_payment(payment_id: int):

    response = (
        supabase
        .table("payments")
        .select("*")
        .eq("payment_id", payment_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Payment not found")

    return response.data[0]


@router.post("/")
def create_payment(payment: PaymentCreate):

    response = (
        supabase
        .table("payments")
        .insert(payment.model_dump())
        .execute()
    )

    return {
        "message": "Payment created successfully",
        "data": response.data
    }


@router.put("/{payment_id}")
def update_payment(payment_id: int, payment: PaymentUpdate):

    response = (
        supabase
        .table("payments")
        .update(payment.model_dump())
        .eq("payment_id", payment_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Payment not found")

    return {
        "message": "Payment updated successfully",
        "data": response.data
    }


@router.delete("/{payment_id}")
def delete_payment(payment_id: int):

    response = (
        supabase
        .table("payments")
        .delete()
        .eq("payment_id", payment_id)
        .execute()
    )

    if not response.data:
        raise HTTPException(status_code=404, detail="Payment not found")

    return {
        "message": "Payment deleted successfully"
    }