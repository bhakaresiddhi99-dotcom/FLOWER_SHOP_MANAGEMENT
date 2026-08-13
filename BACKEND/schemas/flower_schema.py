from pydantic import BaseModel

class FlowerCreate(BaseModel):
    flower_name: str
    price: float
    quantity: int
    category: str
    image: str


class FlowerUpdate(BaseModel):
    flower_name: str
    price: float
    quantity: int
    category: str
    image: str


class FlowerResponse(BaseModel):
    flower_id: int
    flower_name: str
    price: float
    quantity: int
    category: str
    image: str

    class Config:
        from_attributes = True