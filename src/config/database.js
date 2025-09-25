import mongoose from "mongoose";

// 🔌 Función asíncrona que se encarga de conectar la app a MongoDB
const connectDB = async () => {
  try {
    // 🔑 Se obtiene la URI de conexión desde las variables de entorno (.env)
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI no definido en .env"); 
    // ❌ Si no existe, lanza un error para evitar fallos silenciosos.

    // 📡 Conexión a la base de datos usando Mongoose
    await mongoose.connect(uri);

    // ✅ Mensaje en consola si la conexión fue exitosa
    console.log("Conectado a MongoDB");
  } catch (err) {
    // ⚠️ Manejo de errores de conexión
    console.error("Error de conexión:", err.message);

    // 🚪 process.exit(1) termina la ejecución de la app
    // con un código de error (1 = fallo)
    process.exit(1);
  }
};

export default connectDB; // 📤 Exporta la función para usarla en otros módulos
