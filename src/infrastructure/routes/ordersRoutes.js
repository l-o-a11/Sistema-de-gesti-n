import { Router } from "express";
import OrderController from "../controllers/ordersController.js";
import OrderRepositoryMongo from "../../infrastructure/repositories/OrdersRepositoryMongo.js";
import ProductRepositoryMongo from "../../infrastructure/repositories/ProductoRepositoryMongo.js";

const router = Router();

const orderRepo = new OrderRepositoryMongo();
const productRepo = new ProductRepositoryMongo();
const orderController = new OrderController(orderRepo, productRepo);

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.put("/:id/cancel", orderController.cancel);

export default router;
