from pydantic import BaseModel
from typing import Optional

class Bouquet(BaseModel):
    bouquet_id: Optional[int] = None
    bouquet_name: str
    flower_id: int
    price: float
    description: str
    