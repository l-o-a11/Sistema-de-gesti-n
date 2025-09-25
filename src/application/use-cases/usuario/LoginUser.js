export default class LoginUser {
  constructor(userRepository, passwordEncrypter, tokenGenerator) {
    // Inyección de dependencias: el caso de uso no depende de implementaciones concretas
    this.userRepository = userRepository;
    this.passwordEncrypter = passwordEncrypter;
    this.tokenGenerator = tokenGenerator;
  }

  async execute({ email, password }) {
    // Busca al usuario por email
    const user = await this.userRepository.findByUserEmail(email);
    if (!user) throw new Error("Usuario no encontrado"); // Valida si existe

    // Compara la contraseña ingresada con la almacenada
    const isValid = await this.passwordEncrypter.comparePassword(password, user.password);
    if (!isValid) throw new Error("Contraseña incorrecta"); // Valida contraseña

    // Genera token JWT con datos básicos del usuario
    const token = this.tokenGenerator.generate({ id: user.id, email: user.email });

    // Convierte el documento de Mongoose a objeto plano y elimina campos sensibles
    const { password: _, __v, ...userData } = user.toObject();

    // Retorna token y datos del usuario sin información sensible
    return { token, user: userData };
  }
}

// {
//     "email": "sofia6@gmail.com",
//     "password": "123456789"
// }