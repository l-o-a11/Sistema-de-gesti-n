// Importa el caso de uso que maneja la lógica de inicio de sesión
import LoginUser from "../../application/use-cases/usuario/LoginUser.js";
// Importa el repositorio concreto que interactúa con MongoDB
import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";
// Importa la clase encargada de encriptar/verificar contraseñas
import PasswordEncrypter from "../../infrastructure/security/password_encrypter.js";
// Importa la clase para generar tokens JWT
import TokenGenerator from "../../infrastructure/security/token_generator.js";
// Importa el modelo de usuario definido en la capa de dominio
import UserModel from "../../domain/entities/User.js";


// -------------------
// Instanciación de dependencias
// -------------------

// Crea un encriptador de contraseñas (ej: bcrypt)
const passwordEncrypter = new PasswordEncrypter();

// Crea un repositorio que conecta con la base de datos MongoDB usando el modelo de usuario
const userRepository = new UserRepository(UserModel);

// Crea un generador de tokens JWT con la clave secreta (desde variables de entorno o un valor por defecto)
const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET || "supersecret");

// Crea una instancia del caso de uso de login con sus dependencias
const loginUser = new LoginUser(userRepository, passwordEncrypter, tokenGenerator);


// -------------------
// Controlador
// -------------------
export default class LoginController {
  // Método estático para manejar la petición de login
  static async login(req, res) {
    try {
      // Ejecuta el caso de uso con los datos que vienen en el cuerpo de la request (email y password)
      const { token, user } = await loginUser.execute(req.body);

      // Devuelve como respuesta el token y la info del usuario
      res.json({ token, user });
    } catch (err) {
      // Si algo falla (credenciales incorrectas, usuario no existe, etc.)
      res.status(401).json({ error: err.message });
    }
  }
}
