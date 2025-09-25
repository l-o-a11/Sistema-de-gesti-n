// Importa la librería bcrypt, que se utiliza para encriptar y comparar contraseñas
import bcrypt from "bcrypt";

// Clase PasswordEncrypter: se encarga de encriptar y verificar contraseñas
export default class PasswordEncrypter {
  constructor() {
    // Número de "rondas de sal" que bcrypt usará para el proceso de hash.
    // Más rondas = más seguro, pero también más lento (10 es un valor recomendado).
    this.saltRounds = 10;
  }

  // Método para encriptar una contraseña en texto plano
  // - password: la contraseña original escrita por el usuario
  // - retorna: una versión encriptada de la contraseña
  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  // Método para comparar una contraseña en texto plano con una encriptada
  // - password: la que el usuario escribe al iniciar sesión
  // - hashedPassword: la que está guardada en la base de datos
  // - retorna: true si coinciden, false si no
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
