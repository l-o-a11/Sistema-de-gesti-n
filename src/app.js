// Importa la librería dotenv y carga automáticamente las variables de entorno 
// definidas en el archivo .env dentro de process.env
import "dotenv/config.js";

// Importa la función que maneja la conexión a la base de datos
import connectDB from "./config/database.js";

// Importa la configuración del servidor (normalmente Express con sus rutas y middlewares)
import app from "./interfaces/server.js";

// Define el puerto en el que correrá el servidor. 
// Si existe una variable de entorno PORT, la usa; de lo contrario, será 3000 por defecto.
const PORT = process.env.PORT || 3000;

// Llama a la función para conectar a la base de datos.
// Como es una función asíncrona, se usa .then() para ejecutar el servidor 
// solo si la conexión fue exitosa.
connectDB().then(() => {
  
  // Inicia el servidor en el puerto definido y muestra un mensaje en consola
  // confirmando que está corriendo correctamente.
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});
