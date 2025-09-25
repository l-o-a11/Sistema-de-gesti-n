import CreateUser from "../../application/use-cases/usuario/CreateUser.js";
import GetUsers from "../../application/use-cases/usuario/GetUsers.js";
import GetUserById from "../../application/use-cases/usuario/GetUserById.js";
import UpdateUser from "../../application/use-cases/usuario/UpdateUser.js";
import DeleteUser from "../../application/use-cases/usuario/DeleteUser.js";
import PasswordEncrypter from "../../infrastructure/security/password_encrypter.js"
import UserRepositoryMongo from "../repositories/UserRepositoryMongo.js";

// Inicializamos dependencias
const userRepository = new UserRepositoryMongo();
const passwordEncrypter = new PasswordEncrypter();

// ---------------- CONTROLADORES ----------------

// Crear un usuario nuevo
export const createUser = async (req, res) => {
  try {
    // Caso de uso: crear usuario (inyectamos repositorio y encriptador de contraseñas)
    const createUser = new CreateUser(userRepository, passwordEncrypter);
    const user = await createUser.execute(req.body);
    res.status(201).json(user); // Devolvemos el usuario creado
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error interno
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const getUsers = new GetUsers(userRepository);
    const users = await getUsers.execute();
    res.json(users); // Devolvemos la lista
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por ID
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

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const updateUser = new UpdateUser(userRepository);
    const user = await updateUser.execute(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user); // Devolvemos usuario actualizado
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un usuario
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
