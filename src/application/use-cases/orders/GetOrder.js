/**
 * @file GetOrders.js
 * @description Caso de uso para obtener todos los pedidos registrados en la base de datos.
 * Delegará la operación al repositorio de pedidos y devolverá la lista completa.
 */

export default class GetOrders {
  /**
   * Crea una instancia del caso de uso GetOrders.
   * @param {Object} orderRepo - Repositorio que maneja la persistencia de pedidos.
   */
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  /**
   * Ejecuta la obtención de todos los pedidos.
   * @async
   * @function
   * @returns {Promise<Array>} Una promesa que se resuelve con un arreglo de pedidos.
   */
  async execute() {
    return await this.orderRepo.findAll();
  }
}
