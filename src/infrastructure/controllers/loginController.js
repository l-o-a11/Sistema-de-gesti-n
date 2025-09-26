import LoginUser from "../../application/use-cases/usuario/LoginUser.js";
import UserRepository from "../../infrastructure/repositories/UserRepositoryMongo.js";
import PasswordEncrypter from "../../infrastructure/security/password_encrypter.js";
import TokenGenerator from "../../infrastructure/security/token_generator.js";
import UserModel from "../../domain/entities/User.js";



// instancias de dependencias
const passwordEncrypter = new PasswordEncrypter();
const userRepository = new UserRepository(UserModel);
const tokenGenerator = new TokenGenerator(process.env.JWT_SECRET || "supersecret");

const loginUser = new LoginUser(userRepository, passwordEncrypter, tokenGenerator);

export default class LoginController {
  static async login(req, res) {
    try {
      const { token, user } = await loginUser.execute(req.body);
      res.json({ token, user });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}
