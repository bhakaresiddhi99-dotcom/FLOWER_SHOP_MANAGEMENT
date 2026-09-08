from pydantic import BaseModel, EmailStr


class CustomerRegister(BaseModel):
    customer_name: str
    email: EmailStr
    phone: str
    address: str
    password: str


class CustomerLogin(BaseModel):
    email: EmailStr
    password: str