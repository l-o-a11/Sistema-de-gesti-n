// Importa Router de Express, que permite crear un conjunto de rutas agrupadas
import { Router } from "express";

// Importa las funciones del controlador de productos
// Cada una contiene la lógica para manejar operaciones CRUD de productos
import {
  createProducto,   // Crear un nuevo producto
  getProductos,     // Obtener todos los productos
  getProductoById,  // Obtener un producto específico por su ID
  updateProducto,   // Actualizar un producto existente
  deleteProducto    // Eliminar un producto
} from "../controllers/ProductoController.js";

// Crea una nueva instancia de router para las rutas de productos
const router = Router();

// Ruta para crear un producto
// POST /api/productos/
router.post("/", createProducto);

// Ruta para obtener todos los productos
// GET /api/productos/
router.get("/", getProductos);

// Ruta para obtener un producto específico por su ID
// GET /api/productos/:id
router.get("/:id", getProductoById);

// Ruta para actualizar un producto existente (recibe ID por URL)
// PUT /api/productos/:id
router.put("/:id", updateProducto);

// Ruta para eliminar un producto por su ID
// DELETE /api/productos/:id
router.delete("/:id", deleteProducto);

// Exporta el router para que sea usado en el servidor principal
export default router;
