// Importa la clase TokenGenerator, que se encarga de crear y verificar tokens JWT
import TokenGenerator from "../../infrastructure/security/token_generator.js";

// Crea una instancia de TokenGenerator usando:
// - la clave secreta definida en las variables de entorno (JWT_SECRET)
// - el tiempo de validez del token ("4m" = 4 minutos en este caso)
const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET, "4m");

// Middleware de autenticación: se ejecuta antes de llegar a la ruta protegida
export function authMiddleware(req, res, next) {
  // Obtiene el encabezado "Authorization" de la petición HTTP
  const authHeader = req.headers["authorization"];

  // Extrae el token JWT. Normalmente viene con el formato: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  // Si no hay token en la petición, devuelve error 401 (No autorizado)
  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  // Verifica si el token es válido usando la clase TokenGenerator
  const result = tokenGenerator.verify(token);

  // Si el token NO es válido
  if (!result.valid) {
    // Si el token está expirado, responde con 403 (Prohibido)
    if (result.expired) {
      return res.status(403).json({ error: "Token expirado" });
    }
    // Si es inválido por otra razón, también responde con 403
    return res.status(403).json({ error: "Token inválido" });
  }

  // Si el token es válido, guarda la información (payload) del usuario en la request
  req.user = result.payload;

  // Llama a next() para continuar con la siguiente función/ruta
  next();
}
