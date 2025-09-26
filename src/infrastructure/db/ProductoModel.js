import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true, minlength: 4, maxlength: 20 },
  descripcion: { type: String, required: true, minlength: 8, maxlength: 50 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: { type: String, required: true, minlength: 3, maxlength: 50 },
  createdAt: { type: Date, default: Date.now }
});


const ProductoModel = mongoose.model("Producto", ProductoSchema);
export default ProductoModel;
