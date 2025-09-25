import OrderModel from "../db/OrdersModel.js";
// Importamos el modelo de órdenes definido con Mongoose.
// Este modelo representa la colección de órdenes (pedidos) en MongoDB.

export default class OrderRepositoryMongo {
  // Clase repositorio que encapsula las operaciones sobre órdenes en la base de datos.

  async create(orderData) {
    // Crea una nueva orden con los datos recibidos.
    // .create() inserta directamente en la colección y devuelve el documento creado.
    return await OrderModel.create(orderData);
  }

  async findAll() {
    // Devuelve todas las órdenes registradas en la base de datos.
    return await OrderModel.find();
  }

  async findById(id) {
    // Busca una orden por su ID.
    // populate("detalles.productoId") sirve para reemplazar el ID del producto
    // dentro de los detalles con la información completa del producto.
    return await OrderModel.findById(id).populate("detalles.productoId");
  }

  async update(id, data) {
    // Actualiza una orden específica por su ID con la información que se pase en "data".
    // { new: true } hace que retorne el documento actualizado en lugar del anterior.
    return await OrderModel.findByIdAndUpdate(id, data, { new: true });
  }
}
