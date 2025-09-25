/**
 * @file DeleteProducto.js
 * @description Caso de uso para eliminar un producto de la base de datos
 * utilizando su ID. Delegará la operación al repositorio de productos.
 */

export default class DeleteProducto {
    /**
     * Crea una instancia del caso de uso DeleteProducto.
     * @param {Object} productoRepository - Repositorio que maneja la persistencia de productos.
     */
    constructor(productoRepository) {
      this.productoRepository = productoRepository;
    }

    /**
     * Ejecuta la eliminación de un producto según su ID.
     * @async
     * @function
     * @param {string} id - Identificador del producto a eliminar.
     * @returns {Promise<Object|null>} Una promesa que se resuelve con el producto eliminado,
     * o null si no se encontró.
     */
    async execute(id) {
      return await this.productoRepository.delete(id);
    }
}
