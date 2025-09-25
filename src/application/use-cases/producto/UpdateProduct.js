import Producto from "../../../domain/entities/Producto.js";

// Caso de uso para actualizar un producto
export default class UpdateProducto {
    constructor(productoRepository) {
      // Se inyecta el repositorio que maneja la persistencia (DB).
      this.productoRepository = productoRepository;
    }
  
    async execute(id, userData) {
      // 1. Se crea una instancia de la entidad Producto con los datos nuevos
      //    Esto asegura que los datos pasen por las reglas de dominio de Producto.
      const user = new Producto(userData);

      // 2. Se delega al repositorio para que actualice el producto con el ID dado.
      return await this.productoRepository.update(id, user);
    }
}
