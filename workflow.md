Frontend
   ↓
Route
   ↓
Controller
   ↓
Clerk (Who is the user?)
   ↓
Validation + Authorization
   ↓
Query
   ↓
Database
   ↓
Response
   ↓
Frontend

crud wireframe
┌──────────────┬───────────────────────────┐
│ Operation    │ Controller Function       │
├──────────────┼───────────────────────────┤
│ GET all      │ getAllProducts()          │
│ GET one      │ getProductById()          │
│ GET mine     │ getMyProducts()           │
│ POST         │ createProduct()           │
│ PUT          │ updateProduct()           │
│ DELETE       │ deleteProduct()           │
└──────────────┴───────────────────────────┘


                    ┌──────────────────┐
                    │     FRONTEND     │
                    │  React / Client  │
                    └────────┬─────────┘
                             │
                  HTTP Request (GET/POST/
                       PUT/DELETE)
                             │
                             ▼
                    ┌──────────────────┐
                    │      ROUTES      │
                    │ /products/:id    │
                    └────────┬─────────┘
                             │
                             ▼
              ┌────────────────────────────┐
              │       CONTROLLER           │
              │                            │
              │ getAllProducts()            │
              │ getProductById()            │
              │ getMyProducts()             │
              │ createProduct()             │
              │ updateProduct()             │
              │ deleteProduct()             │
              └───────┬──────────┬─────────┘
                      │          │
              ┌───────▼──────┐   │
              │    CLERK     │   │
              │ Authentication│  │
              │   userId     │   │
              └──────────────┘   │
                                 ▼
                        ┌─────────────────┐
                        │  QUERY LAYER    │
                        │ ../db/query.ts  │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │    DATABASE     │
                        │    Products     │
                        └────────┬────────┘
                                 │
                                 │ Result
                                 ▼
                        ┌─────────────────┐
                        │   CONTROLLER    │
                        └────────┬────────┘
                                 │
                           JSON Response
                                 │
                                 ▼
                        ┌─────────────────┐
                        │    FRONTEND     │
                        └─────────────────┘