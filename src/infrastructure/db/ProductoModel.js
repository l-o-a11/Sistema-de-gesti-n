import mongoose from "mongoose";

// Definimos el esquema del producto
const ProductoSchema = new mongoose.Schema({
  // Nombre del producto
  nombre: { 
    type: String,             // Debe ser texto
    required: true,           // Obligatorio
    unique: true,             // No puede repetirse (cada producto tiene nombre único)
    minlength: 4,             // Mínimo 4 caracteres
    maxlength: 20             // Máximo 20 caracteres
  },

  // Descripción del producto
  descripcion: { 
    type: String, 
    required: true,
    minlength: 8,
    maxlength: 50
  },

  // Precio del producto
  precio: { 
    type: Number,             // Debe ser numérico
    required: true            // Obligatorio
  },

  // Cantidad disponible en inventario
  stock: { 
    type: Number, 
    required: true 
  },

  // Categoría del producto (ejemplo: “Tecnología”, “Ropa”)
  categoria: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 50 
  },

  // Fecha de creación automática
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Creamos el modelo "Producto", que se conecta con la colección "productos" en MongoDB
const ProductoModel = mongoose.model("Producto", ProductoSchema);
export default ProductoModel;
