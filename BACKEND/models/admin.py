from pydantic import BaseModel, EmailStr
from typing import Optional

class Admin(BaseModel):
    admin_id: Optional[int] = None
    admin_name: str
    email: EmailStr
    password: str
    phone: str