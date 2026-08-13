from pydantic import BaseModel, EmailStr

class AdminCreate(BaseModel):
    admin_name: str
    email: EmailStr
    password: str
    phone: str


class AdminUpdate(BaseModel):
    admin_name: str
    email: EmailStr
    password: str
    phone: str


class AdminResponse(BaseModel):
    admin_id: int
    admin_name: str
    email: EmailStr
    phone: str

    class config:
        from_attributes: True
    