import mongoose from "mongoose";

// Subesquema para los detalles de la orden (productos dentro del pedido)
const OrderDetailSchema = new mongoose.Schema({
  // Producto relacionado (referencia a la colección "Producto")
  productoId: { 
    type: mongoose.Schema.Types.ObjectId, // Se usa ObjectId porque referencia a otro documento
    ref: "Producto",                      // Relación con el modelo Producto
    required: true 
  },

  // Cantidad del producto en la orden
  cantidad: { 
    type: Number, 
    required: true 
  },

  // Precio unitario del producto en el momento de la compra
  precioUnitario: { 
    type: Number, 
    required: true 
  },

  // Subtotal (cantidad * precioUnitario)
  subtotal: { 
    type: Number, 
    required: true 
  }
});

// Esquema principal de la orden
const OrderSchema = new mongoose.Schema({
  // Usuario que realizó la orden
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, // Relación con la colección de usuarios
    ref: "User", 
    required: true 
  },

  // Total de la orden (suma de los subtotales)
  total: { 
    type: Number, 
    required: true 
  },

  // Estado del pedido (por defecto activo, se puede cancelar)
  estado: { 
    type: String, 
    enum: ["activo", "cancelado"], // Solo puede tener estos dos valores
    default: "activo" 
  },

  // Fecha de creación automática
  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  // Lista de productos con sus cantidades y subtotales
  detalles: [OrderDetailSchema]
});

// Creamos y exportamos el modelo "Order"
export default mongoose.model("Order", OrderSchema);
