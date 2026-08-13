from pydantic import BaseModel

class PaymentCreate(BaseModel):
    order_id: int
    payment_method: str
    payment_status: str
    amount: float


class PaymentUpdate(BaseModel):
    order_id: int
    payment_method: str
    payment_status: str
    amount: float


class PaymentResponse(BaseModel):
    payment_id: int
    order_id: int
    payment_method: str
    payment_status: str
    amount: float

    class Config:
        from_attributes = True