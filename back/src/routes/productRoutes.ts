import { Router } from "express";
import * as productController from "../controllers/productController"
import { requireAuth } from "@clerk/express";

const router=Router()

//GET /api/products => get all products (public)

router.get("/", productController.getAllProducts)

// GET /api/products/my => get current users products (Protected)
router.get("/my", requireAuth(), productController.getMyProducts)

//GET /api/products/:id -GET single product by ID(public)
router.get("/:id", requireAuth(), productController.getProductById)

//POST /api/products - Create new product (protected)
router.post("/", requireAuth(), productController.createProduct)

//put /api/products/:id -update a product (protected - owner only)
router.put("/:id", requireAuth(), productController.updateProduct)

//DELETE /api/products/:id -delete a product (protected - owner only)
router.delete("/:id", requireAuth(), productController.deleteProduct)

export default router