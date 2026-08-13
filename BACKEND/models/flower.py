from pydantic import BaseModel
from typing import Optional

class Flower(BaseModel):
    flower_id: Optional[int] = None
    flower_name: str
    price: float
    quantity: int
    category: str
    image: str