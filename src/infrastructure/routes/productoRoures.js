import { Router } from "express";

import {
  createProducto,
  getProductos,
  getProductoById,
  updateProducto,
  deleteProducto
} from "../controllers/ProductoController.js";


const router = Router();
router.post("/", createProducto);
router.get("/", getProductos);
router.get("/:id", getProductoById);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

export default router