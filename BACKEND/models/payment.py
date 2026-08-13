from pydantic import BaseModel
from typing import Optional

class Payment(BaseModel):
    payment_id: Optional[int] = None
    order_id: int
    payment_method: str
    payment_status: str
    amount: float