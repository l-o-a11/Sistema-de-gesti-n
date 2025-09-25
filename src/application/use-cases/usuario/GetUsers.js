export default class GetUsers {
    constructor(userRepository) {
      // Inyección de dependencia: se pasa el repositorio para no acoplarse a una implementación concreta
      this.userRepository = userRepository;
    }

    async execute() {
      // Llama al repositorio para obtener todos los usuarios
      // Devuelve directamente la lista (no aplica transformaciones ni filtros)
      return await this.userRepository.findAll();
    }
}
