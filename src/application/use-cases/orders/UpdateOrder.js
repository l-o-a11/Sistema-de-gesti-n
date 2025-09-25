/**
 * @file CancelOrder.js
 * @description Caso de uso para cancelar un pedido existente. 
 * Se encarga de:
 * - Validar que el pedido exista.
 * - Verificar que no esté ya cancelado.
 * - Devolver el stock de los productos incluidos en el pedido.
 * - Actualizar el estado del pedido a "cancelado".
 */

export default class CancelOrder {
  /**
   * Crea una instancia del caso de uso CancelOrder.
   * @param {Object} orderRepo - Repositorio que maneja la persistencia de pedidos.
   * @param {Object} productRepo - Repositorio que maneja la persistencia de productos.
   */
  constructor(orderRepo, productRepo) {
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
  }

  /**
   * Ejecuta la cancelación de un pedido.
   * @async
   * @function
   * @param {string} orderId - ID del pedido que se desea cancelar.
   * @throws {Error} Si el pedido no existe o ya está cancelado.
   * @returns {Promise<Object>} Una promesa que se resuelve con el pedido actualizado.
   */
  async execute(orderId) {
    // Buscar el pedido por su ID
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado");
    if (order.estado === "cancelado") throw new Error("El pedido ya está cancelado");

    // Devolver el stock de cada producto incluido en el pedido
    for (const det of order.detalles) {
      const product = await this.productRepo.findById(det.productoId);
      await this.productRepo.updateStock(det.productoId, product.stock + det.cantidad);
    }

    // Actualizar el estado del pedido a "cancelado" y devolver el resultado
    return await this.orderRepo.update(orderId, { estado: "cancelado" });
  }
}
