import OrderModel from "../db/OrdersModel.js";

export default class OrderRepositoryMongo {
  async create(orderData) {
    return await OrderModel.create(orderData);
  }

  async findAll() {
    return await OrderModel.find();
  }

  async findById(id) {
    return await OrderModel.findById(id).populate("detalles.productoId");
  }

  async update(id, data) {
    return await OrderModel.findByIdAndUpdate(id, data, { new: true });
  }
}
