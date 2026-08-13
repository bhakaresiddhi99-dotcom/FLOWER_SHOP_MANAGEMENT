from pydantic import BaseModel

class DeliveryCreate(BaseModel):
    order_id: int
    delivery_address: str
    delivery_date: str
    delivery_status: str


class DeliveryUpdate(BaseModel):
    order_id: int
    delivery_address: str
    delivery_date: str
    delivery_status: str


class DeliveryResponse(BaseModel):
    delivery_id: int
    order_id: int
    delivery_address: str
    delivery_date: str
    delivery_status: str

    class Config:
        from_attributes = True