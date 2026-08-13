from pydantic import BaseModel

class CategoryCreate(BaseModel):
    category_name: str
    description: str


class CategoryUpdate(BaseModel):
    category_name: str
    description: str


class CategoryResponse(BaseModel):
    id: int
    category_name: str
    description: str

    class Config:
        from_attributes = True