/**
 * @file GetOrderById.js
 * @description Caso de uso para obtener un pedido específico a partir de su ID.
 * Delegará la búsqueda al repositorio de pedidos y devolverá el resultado.
 */

export default class GetOrderById {
  /**
   * Crea una instancia del caso de uso GetOrderById.
   * @param {Object} orderRepo - Repositorio que maneja la persistencia de pedidos.
   */
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  /**
   * Ejecuta la búsqueda de un pedido según su ID.
   * @async
   * @function
   * @param {string} id - Identificador del pedido a buscar.
   * @returns {Promise<Object|null>} Una promesa que se resuelve con el pedido encontrado,
   * o null si no existe.
   */
  async execute(id) {
    return await this.orderRepo.findById(id);
  }
}
