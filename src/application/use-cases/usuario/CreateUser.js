import User from "../../../domain/entities/User.js";

// Caso de uso para crear un nuevo usuario
export default class CreateUser {
    constructor(userRepository, passwordEncrypter) {
      // Se inyectan las dependencias:
      // - userRepository: para interactuar con la base de datos (guardar el usuario).
      // - passwordEncrypter: para manejar la encriptación de contraseñas.
      this.userRepository = userRepository;
      this.passwordEncrypter = passwordEncrypter;
    }
  
    async execute(userData) {
      // 1. Se crea una instancia de la entidad User para validar las reglas de dominio.
      const user = new User(userData);

      // 2. Se extraen los atributos principales del usuario.
      const { nombre, email, password, rol, createAt } = user;

      // 3. Encriptar la contraseña antes de guardarla en la base de datos
      // (esto asegura que no se almacenen contraseñas en texto plano).
      const hashedPassword = await this.passwordEncrypter.hashPassword(password);

      // 4. Se construye el objeto con los datos que finalmente se van a guardar.
      const userToSave = {
        nombre,
        email,
        password: hashedPassword, // la contraseña se guarda encriptada
        rol,
        createAt
      };

      // 5. Se guarda el usuario usando el repositorio y se devuelve el resultado.
      return await this.userRepository.create(userToSave);
    }
}


// {
//     "nombre": "antonia",
//     "email": "sofia@gmail.com",
//     "password": "123456789",
//     "rol":"Vendedor"
// }