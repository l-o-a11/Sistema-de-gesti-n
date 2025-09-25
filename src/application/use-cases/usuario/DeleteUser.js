export default class DeleteUser {
    constructor(userRepository) {
      // Se recibe una instancia del repositorio de usuarios (inyección de dependencia).
      // Esto permite que la clase esté desacoplada de la implementación concreta (Mongo, SQL, etc.).
      this.userRepository = userRepository;
    }

    async execute(id) {
      // Llama al método del repositorio para eliminar un usuario por su ID.
      // Devuelve el resultado de la operación (puede ser el usuario eliminado, un booleano o null según la implementación del repositorio).
      return await this.userRepository.delete(id);
    }
}
