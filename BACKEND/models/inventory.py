from pydantic import BaseModel
from typing import Optional

class Inventory(BaseModel):
    inventory_id: Optional[int] = None
    flower_id: int
    stock_quantity: int
    last_updated: str