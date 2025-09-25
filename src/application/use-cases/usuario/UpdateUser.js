import User from "../../../domain/entities/User.js";

// 📦 Caso de uso: actualizar un usuario existente
export default class UpdateUser {
    constructor(userRepository) {
      // 🔗 Inyección de dependencias:
      // Se recibe un repositorio (ej. Mongo, memoria, etc.)
      // para no acoplar esta lógica a una base de datos específica.
      this.userRepository = userRepository;
    }
  
    async execute(id, userData) {
      // 🏗️ Se crea una nueva instancia de la entidad User con los datos recibidos.
      // Esto asegura que se validen las reglas de negocio definidas en la entidad.
      const user = new User(userData);

      // 💾 Se pasa al repositorio para que haga la actualización en la DB
      return await this.userRepository.update(id, user);
    }
}
