// Importa la librería jsonwebtoken, que permite crear y verificar tokens JWT
import jwt from "jsonwebtoken";

// Clase TokenGenerator: se encarga de generar y validar tokens
export default class TokenGenerator {
  // El constructor recibe:
  // - secret: la clave secreta usada para firmar/verificar los tokens
  // - expiresIn: el tiempo de validez de cada token (por defecto "2h" = 2 horas)
  constructor(secret, expiresIn = "2h") {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  // Método para generar un token JWT
  // payload = los datos que quieres guardar dentro del token (ej: id de usuario)
  generate(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  // Método para verificar si un token es válido
  verify(token) {
    try {
      // Si el token es válido y no ha expirado, lo decodifica
      const decoded = jwt.verify(token, this.secret);
      return { valid: true, expired: false, payload: decoded };
    } catch (err) {
      // Si el token está expirado, lo marca como inválido y expirado
      if (err.name === "TokenExpiredError") {
        return { valid: false, expired: true, payload: null };
      }
      // Si el token es inválido por otra razón (firma incorrecta, manipulación, etc.)
      return { valid: false, expired: false, payload: null };
    }
  }
}
