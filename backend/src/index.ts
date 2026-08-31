import express, { urlencoded } from "express"
import cors from "cors"

import { ENV } from "./config/env"
import {clerkMiddleware} from "@clerk/express"

const app = express()

app.use(cors({origin: ENV.FRONTEND_URL}))
app.use(clerkMiddleware()) //auth object will be attached to the req
app.use(express.json()) // parses data to json
app.use(express.urlencoded({extended:true})) //parses from data(like html and forms)

app.get("/api/health", (req, res) => {
    res.json({
        message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        },
    });
});

app.listen(ENV.PORT, () => console.log(`Server is running at PORT:${ENV.PORT}`))