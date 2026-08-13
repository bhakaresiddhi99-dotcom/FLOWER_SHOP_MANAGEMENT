from pydantic import BaseModel

class InventoryCreate(BaseModel):
    flower_id: int
    stock_quantity: int
    last_updated: str


class InventoryUpdate(BaseModel):
    flower_id: int
    stock_quantity: int
    last_updated: str


class InventoryResponse(BaseModel):
    inventory_id: int
    flower_id: int
    stock_quantity: int
    last_updated: str

    class Config:
        from_attributes = True