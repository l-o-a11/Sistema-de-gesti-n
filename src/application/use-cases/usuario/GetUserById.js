export default class GetUserById {
    constructor(userRepository) {
      // Inyección de dependencia: el caso de uso recibe el repositorio de usuarios
      this.userRepository = userRepository;
    }

    async execute(id) {
      // Llama al método del repositorio para buscar un usuario por su ID
      // Devuelve directamente el resultado (puede ser el usuario o null si no existe)
      return await this.userRepository.findById(id);
    }
}
