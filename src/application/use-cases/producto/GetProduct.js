/**
 * @file GetProductos.js
 * @description Caso de uso para obtener todos los productos de la base de datos.
 * Utiliza un repositorio de productos para acceder a la persistencia y devuelve
 * la lista completa de productos.
 */

export default class GetProductos {
    /**
     * Crea una instancia del caso de uso GetProductos.
     * @param {Object} productoRepository - Repositorio que maneja la persistencia de productos.
     */
    constructor(productoRepository) {
      this.productoRepository = productoRepository;
    }

    /**
     * Ejecuta el caso de uso para obtener todos los productos.
     * @async
     * @function
     * @returns {Promise<Array>} Una promesa que se resuelve con un arreglo de productos.
     */
    async execute() {
      return await this.productoRepository.findAll();
    }
}
