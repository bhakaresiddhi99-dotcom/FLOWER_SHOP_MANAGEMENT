from pydantic import BaseModel

class OrderCreate(BaseModel):
    customer_id: int
    order_date: str
    total_amount: float
    order_status: str


class OrderUpdate(BaseModel):
    customer_id: int
    order_date: str
    total_amount: float
    order_status: str


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    order_date: str
    total_amount: float
    order_status: str

    class Config:
        from_attributes = True