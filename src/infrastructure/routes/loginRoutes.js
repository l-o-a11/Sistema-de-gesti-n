// Importa Router de Express para poder definir rutas
import { Router } from "express";

// Importa el controlador de login, que contiene la lógica de autenticación
import LoginController from "../controllers/loginController.js";

// Crea una instancia del router
const router = Router();

// Ruta para iniciar sesión
// POST /api/auth/login
// Cuando llega una petición POST, se llama al método "login" del LoginController.
// Este método normalmente:
//   - Verifica el correo/usuario y la contraseña
//   - Encripta/valida la contraseña usando bcrypt
//   - Si todo es correcto, genera y devuelve un token JWT
router.post("/", (req, res) => LoginController.login(req, res));

// Exporta el router para que sea usado en el servidor principal
export default router;
