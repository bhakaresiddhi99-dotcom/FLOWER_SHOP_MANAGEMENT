from pydantic import BaseModel

class BouquetCreate(BaseModel):
    bouquet_name: str
    flower_id: int
    price: float
    description: str

class BouquetUpdate(BaseModel):
    bouquet_name: str
    flower_id: int
    price: float
    description: str


class BouquetResponse(BaseModel):
    bouquet_id: int
    bouquet_name: str
    flower_id: int
    price: float
    description: str

    class Config:
        from_attributes = True