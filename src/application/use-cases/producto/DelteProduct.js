export default class DeleteProducto {
    constructor(productoRepository) {
      this.productoRepository = productoRepository;
    }
    async execute(id) {
      return await this.productoRepository.delete(id);
    }
}  