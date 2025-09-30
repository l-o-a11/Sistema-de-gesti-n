import Producto from "../../../domain/entities/Producto.js";

export default class UpdateProducto {
    constructor(ProductoRepository) {
      this.ProductoRepository = ProductoRepository;
    }
  
    async execute(id, userData) {
      const user = new Producto(userData);
     return await this.ProductoRepository.update(id, user);
    }
}  