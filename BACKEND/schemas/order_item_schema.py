from pydantic import BaseModel

class OrderItemCreate(BaseModel):
    order_id: int
    flower_id: int
    quantity: int
    price: float


class OrderItemUpdate(BaseModel):
    order_id: int
    flower_id: int
    quantity: int
    price: float


class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    flower_id: int
    quantity: int
    price: float

    class Config:
        from_attributes = True