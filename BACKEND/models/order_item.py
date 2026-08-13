from pydantic import BaseModel
from typing import Optional

class OrderItem(BaseModel):
    id: Optional[int] = None
    order_id: int
    flower_id: int
    quantity: int
    price: float