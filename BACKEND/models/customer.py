from pydantic import BaseModel
from typing import Optional

class Customer(BaseModel):
    id: Optional[int] = None
    customer_name: str
    email: str
    phone: str
    address: str