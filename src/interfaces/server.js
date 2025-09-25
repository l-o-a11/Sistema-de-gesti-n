// Importa el framework Express, que sirve para crear el servidor y manejar las rutas HTTP
import express from "express";

// Importa las rutas relacionadas con los usuarios (registro, gestión de usuarios, etc.)
import userRoutes from "../infrastructure/routes/userRoutes.js";

// Importa las rutas relacionadas con el inicio de sesión (autenticación/login)
import loginRoutes from "../infrastructure/routes/loginRoutes.js";

// Importa las rutas relacionadas con los productos
import productoRoutes from "../infrastructure/routes/productoRoures.js";

// Importa las rutas relacionadas con los pedidos (orders)
import ordersRoutes from "../infrastructure/routes/ordersRoutes.js";

// Crea la aplicación principal de Express
const app = express();

// Middleware que permite a Express entender y procesar datos en formato JSON
// en el cuerpo (body) de las peticiones HTTP.
app.use(express.json());

// Define el prefijo de las rutas para cada módulo de la aplicación:
// - Cuando se haga una petición a /api/auth/register -> se usa userRoutes
app.use("/api/auth/register", userRoutes);

// - Cuando se haga una petición a /api/auth/login -> se usa loginRoutes
app.use("/api/auth/login", loginRoutes);

// - Cuando se haga una petición a /api/productos -> se usa productoRoutes
app.use("/api/productos", productoRoutes);

// - Cuando se haga una petición a /api/orders -> se usa ordersRoutes
app.use("/api/orders", ordersRoutes);

// Exporta la aplicación configurada para que pueda ser utilizada en otro archivo (server.js)
export default app;
