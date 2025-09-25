import mongoose from "mongoose";

// Definimos el esquema del usuario (estructura de los datos en la colección "users").
const UserSchema = new mongoose.Schema({
  // Nombre del usuario
  nombre: { 
    type: String,            // Debe ser texto
    required: true,          // Obligatorio
    minlength: 4,            // Longitud mínima
    maxlength: 20            // Longitud máxima
  },

  // Correo electrónico
  email: {
    type: String,            
    required: true,          // Obligatorio
    unique: true,            // No se puede repetir en la base de datos
    minlength: 8,
    maxlength: 50,
    match: /.+\@.+\..+/      // Expresión regular: debe tener formato de email
  },

  // Contraseña (encriptada con bcrypt antes de guardarse)
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 60            // Se deja un rango alto porque al encriptar la clave se hace más larga
  },

  // Rol del usuario dentro del sistema
  rol: {
    type: String,
    required: true,
    enum: ["Administrador", "Vendedor"] // Solo puede ser uno de estos dos valores
  },

  // Fecha de creación automática
  createdAt: { 
    type: Date,
    default: Date.now        // Se asigna la fecha y hora en que se guarda
  }
});

// Creamos el modelo "User", que representa la colección en MongoDB
export const UserModel = mongoose.model("User", UserSchema);
