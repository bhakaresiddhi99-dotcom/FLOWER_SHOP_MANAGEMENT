from pydantic import BaseModel
from typing import Optional

class Order(BaseModel):
    id: Optional[int] = None
    customer_id: int
    order_date: str
    total_amount: float
    order_status: str