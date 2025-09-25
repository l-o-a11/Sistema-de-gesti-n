// Importa Router de Express para poder definir rutas
import { Router } from "express";

// Importa el controlador de pedidos, que contiene la lógica para manejar órdenes
import OrderController from "../controllers/ordersController.js";

// Importa los repositorios de datos (para acceder a la base de datos MongoDB)
// - OrdersRepositoryMongo: maneja la persistencia de pedidos
// - ProductoRepositoryMongo: maneja la persistencia de productos
import OrderRepositoryMongo from "../../infrastructure/repositories/OrdersRepositoryMongo.js";
import ProductRepositoryMongo from "../../infrastructure/repositories/ProductoRepositoryMongo.js";

// Crea una instancia del router
const router = Router();

// Crea instancias de los repositorios (acceso a datos en MongoDB)
const orderRepo = new OrderRepositoryMongo();
const productRepo = new ProductRepositoryMongo();

// Crea una instancia del controlador de pedidos y le pasa los repositorios
// Esto implementa el patrón de inyección de dependencias:
// el controlador depende de repositorios concretos para realizar sus operaciones
const orderController = new OrderController(orderRepo, productRepo);

// Rutas para pedidos (orders)

// Crear un nuevo pedido
// POST /api/orders/
router.post("/", orderController.create);

// Obtener todos los pedidos
// GET /api/orders/
router.get("/", orderController.getAll);

// Obtener un pedido por su ID
// GET /api/orders/:id
router.get("/:id", orderController.getById);

// Cancelar un pedido (cambia su estado a cancelado)
// PUT /api/orders/:id/cancel
router.put("/:id/cancel", orderController.cancel);

// Exporta el router para que pueda usarse en el servidor principal
export default router;
