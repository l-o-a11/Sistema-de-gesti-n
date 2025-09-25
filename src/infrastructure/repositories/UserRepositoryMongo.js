import { UserModel } from "../db/UserModel.js"; 
// Importamos el modelo de usuario definido con Mongoose (esquema en la base de datos MongoDB).

class UserRepositoryMongo {
  // Esta clase actúa como un repositorio, es decir, 
  // una capa intermedia entre la base de datos y los controladores.
  // Encapsula las operaciones de acceso a datos relacionadas con los usuarios.

  async create(userData) {
    // Crea un nuevo usuario en la base de datos.
    const user = new UserModel(userData); // Se instancia el modelo con los datos recibidos.
    return await user.save(); // Se guarda en la colección y retorna el objeto almacenado.
  }

  async findAll() {
    // Obtiene todos los usuarios de la colección.
    return await UserModel.find();
  }

  async findById(id) {
    // Busca un usuario por su ID en MongoDB.
    return await UserModel.findById(id);
  }

  async findByUserEmail(email) {
    // Busca un usuario por su correo electrónico.
    return await UserModel.findOne({ email: email });
  }
}

export default UserRepositoryMongo;
// Exportamos la clase para usarla en controladores u otros servicios.
