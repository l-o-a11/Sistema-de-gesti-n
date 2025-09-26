import mongoose from "mongoose";

const OrderDetailSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  total: { type: Number, required: true },
  estado: { type: String, enum: ["activo", "cancelado"], default: "activo" },
  createdAt: { type: Date, default: Date.now },
  detalles: [OrderDetailSchema]
});

export default mongoose.model("Order", OrderSchema);
