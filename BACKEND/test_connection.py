from database import supabase

response = supabase.table("inventory").insert({
    "flower_id": 1,
    "stock_quantity": 100
}).execute()

print(response.data)