import ProductoModel from "../db/ProductoModel.js";

export default class ProductoRepositoryMongo {
  async findById(id) {
    return await ProductoModel.findById(id);
  }

  async create(productoData) {
    return await ProductoModel.create(productoData);
  }

  async findAll() {
    return await ProductoModel.find();
  }

  async update(id, data) {
    return await ProductoModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await ProductoModel.findByIdAndDelete(id);
  }

  async updateStock(id, newStock) {
    return await ProductoModel.findByIdAndUpdate(
      id,
      { stock: newStock },
      { new: true }
    );
  }
}
