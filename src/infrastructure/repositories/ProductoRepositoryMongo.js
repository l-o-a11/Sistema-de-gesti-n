import ProductoModel from "../db/ProductoModel.js";
// Importamos el modelo de productos definido con Mongoose.
// Este modelo representa la colección de productos en MongoDB.

export default class ProductoRepositoryMongo {
  // Esta clase define un "repositorio" que encapsula todas
  // las operaciones de acceso a datos para productos.

  async findById(id) {
    // Busca un producto por su ID.
    return await ProductoModel.findById(id);
  }

  async create(productoData) {
    // Crea un nuevo producto con los datos recibidos.
    // ProductoModel.create() automáticamente guarda en la DB.
    return await ProductoModel.create(productoData);
  }

  async findAll() {
    // Retorna todos los productos en la colección.
    return await ProductoModel.find();
  }

  async update(id, data) {
    // Actualiza un producto por su ID con los datos proporcionados.
    // La opción { new: true } hace que se retorne el producto actualizado.
    return await ProductoModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    // Elimina un producto por su ID.
    return await ProductoModel.findByIdAndDelete(id);
  }

  // 👇 Método adicional
  async updateStock(id, newStock) {
    // Actualiza solamente el campo "stock" de un producto.
    // Esto es útil cuando se realizan pedidos que reducen el inventario.
    return await ProductoModel.findByIdAndUpdate(
      id,
      { stock: newStock }, // Solo modificamos la propiedad stock
      { new: true }        // Retorna el producto actualizado
    );
  }
}
