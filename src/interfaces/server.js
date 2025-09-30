import express from "express";
import cors from "cors";
import userRoutes from "../infrastructure/routes/userRoutes.js";
import loginRoutes from "../infrastructure/routes/loginRoutes.js";
import productoRoutes from "../infrastructure/routes/productoRoures.js";
import ordersRoutes from "../infrastructure/routes/ordersRoutes.js";
const app = express();
// Habilitar CORS
app.use(cors({
   origin: [
    "http://localhost:5173",          // para desarrollo local
    "https://stock-registro.web.app"  // tu hosting en producción
  ], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth/register", userRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/orders", ordersRoutes);
export default app;


