import User from "../../../domain/entities/User.js";

export default class CreateUser {
    constructor(userRepository, passwordEncrypter) {
      this.userRepository = userRepository;
      this.passwordEncrypter = passwordEncrypter;
    }
  
    async execute(userData) {
      const user = new User(userData);
      const { nombre, email, password, rol, createAt } = user;
      // encriptar la contraseña antes de guardar
      const hashedPassword = await this.passwordEncrypter.hashPassword(password);

      const userToSave = {
      nombre,
      email,
      password: hashedPassword,
      rol,
      createAt
    };

      return await this.userRepository.create(userToSave);
    }
}  

// {
//     "nombre": "antonia",
//     "email": "sofia@gmail.com",
//     "password": "123456789",
//     "rol":"Vendedor"
// }