// Caso de uso: obtener un producto específico a partir de su ID
export default class GetProductoById {
    constructor(productoRepository) {
      // Guardamos el repositorio de productos que se encargará
      // de interactuar con la base de datos
      this.productoRepository = productoRepository;
    }

    async execute(id) {
      // Llamamos al repositorio para buscar el producto por su ID
      // y devolvemos el resultado
      return await this.productoRepository.findById(id);
    }
}
