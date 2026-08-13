from pydantic import BaseModel
from typing import Optional

class Delivery(BaseModel):
    delivery_id: Optional[int] = None
    order_id: int
    delivery_address: str
    delivery_date: str
    delivery_status: str