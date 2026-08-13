from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.admin import router as admin_router
from routers.category import router as category_router
from routers.flower import router as flower_router
from routers.customer import router as customer_router
from routers.order import router as order_router
from routers.order_item import router as order_item_router
from routers.payment import router as payment_router
from routers.delivery import router as delivery_router
from routers.bouquet import router as bouquet_router
from routers.inventory import router as inventory_router
from routers.login import router as login_router


app = FastAPI(
    title="Flower Shop Management API",
    version="1.0.0"
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(admin_router)
app.include_router(category_router)
app.include_router(flower_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(order_item_router)
app.include_router(payment_router)
app.include_router(delivery_router)
app.include_router(bouquet_router)
app.include_router(inventory_router)
app.include_router(login_router)



@app.get("/")
def home():
    return {
        "message": "Welcome to Flower Shop Management API"
    }