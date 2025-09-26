import CreateUser from "../../application/use-cases/usuario/CreateUser.js";
import GetUsers from "../../application/use-cases/usuario/GetUsers.js";
import GetUserById from "../../application/use-cases/usuario/GetUserById.js";
import UpdateUser from "../../application/use-cases/usuario/UpdateUser.js";
import DeleteUser from "../../application/use-cases/usuario/DeleteUser.js";
import PasswordEncrypter from "../../infrastructure/security/password_encrypter.js"
import UserRepositoryMongo from "../repositories/UserRepositoryMongo.js";

const userRepository = new UserRepositoryMongo();
const passwordEncrypter = new PasswordEncrypter();
export const createUser = async (req, res) => {
  try {
    const createUser = new CreateUser(userRepository, passwordEncrypter);
    const user = await createUser.execute(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const getUsers = new GetUsers(userRepository);
    const users = await getUsers.execute();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const getUserById = new GetUserById(userRepository);
    const user = await getUserById.execute(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = new UpdateUser(userRepository);
    const user = await updateUser.execute(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteUser = new DeleteUser(userRepository);
    const result = await deleteUser.execute(req.params.id);
    if (!result) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};