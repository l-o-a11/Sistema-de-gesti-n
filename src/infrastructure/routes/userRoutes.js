// Importa Router de Express, que permite definir rutas agrupadas
import { Router } from "express";

// Importa las funciones del controlador de usuarios
// Cada una contiene la lógica para manejar las operaciones CRUD sobre usuarios
import {
  createUser,   // Crear un nuevo usuario
  getUsers,     // Obtener todos los usuarios
  getUserById,  // Obtener un usuario por su ID
  updateUser,   // Actualizar datos de un usuario
  deleteUser    // Eliminar un usuario
} from "../controllers/userController.js";

// Importa el middleware de autenticación, que protege rutas con JWT
import { authMiddleware } from "../../interfaces/middlewares/authMiddleware.js";

// Crea una instancia de router para definir las rutas de usuarios
const router = Router();

// Ruta para crear un usuario (registro)
// POST /api/auth/register/
router.post("/", createUser);

// Ruta para obtener todos los usuarios (solo accesible si el token es válido)
// GET /api/auth/register/
router.get("/", authMiddleware, getUsers);

// Ruta para obtener un usuario específico por ID
// GET /api/auth/register/:id
router.get("/:id", getUserById);

// Ruta para actualizar un usuario (requiere autenticación con token)
// PUT /api/auth/register/:id
router.put("/:id", authMiddleware, updateUser);

// Ruta para eliminar un usuario por su ID
// DELETE /api/auth/register/:id
router.delete("/:id", deleteUser);

// Exporta el router para que pueda usarse en server.js
export default router;
