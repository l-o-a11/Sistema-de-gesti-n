/**
 * @file CreateOrder.js
 * @description Caso de uso para crear un nuevo pedido en la base de datos.
 * Se encarga de:
 * - Validar que los productos existan y tengan stock suficiente.
 * - Calcular el total del pedido.
 * - Actualizar el stock de los productos.
 * - Registrar el pedido con los detalles correspondientes.
 */

export default class CreateOrder {
  /**
   * Crea una instancia del caso de uso CreateOrder.
   * @param {Object} orderRepo - Repositorio que maneja la persistencia de pedidos.
   * @param {Object} productRepo - Repositorio que maneja la persistencia de productos.
   */
  constructor(orderRepo, productRepo) {
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
  }

  /**
   * Ejecuta la creación de un nuevo pedido.
   * @async
   * @function
   * @param {string} usuarioId - ID del usuario que realiza el pedido.
   * @param {Array<Object>} detalles - Lista de productos y cantidades del pedido.
   * @param {string} detalles[].productoId - ID del producto a incluir en el pedido.
   * @param {number} detalles[].cantidad - Cantidad del producto a pedir.
   * @throws {Error} Si algún producto no existe o no tiene stock suficiente.
   * @returns {Promise<Object>} Una promesa que se resuelve con el pedido creado.
   */
  async execute(usuarioId, detalles) {
    let total = 0;

    // Validar productos y calcular total, actualizando stock
    for (const det of detalles) {
      const product = await this.productRepo.findById(det.productoId);
      if (!product) throw new Error(`Producto ${det.productoId} no existe`);
      if (product.stock < det.cantidad) {
        throw new Error(`Stock insuficiente para producto ${product.nombre}`);
      }

      total += det.cantidad * product.precio;
      det.precioUnitario = product.precio;

      // Actualizar stock del producto
      await this.productRepo.updateStock(det.productoId, product.stock - det.cantidad);
    }

    // Crear el pedido con los detalles completos
    const order = await this.orderRepo.create({
      usuarioId,
      total,
      estado: "activo",
      detalles: detalles.map(d => ({
        productoId: d.productoId,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario,
        subtotal: d.cantidad * d.precioUnitario,
      }))
    });

    return order;
  }
}

// {
//   "usuarioId": "68d4621549d66e088d3cacb6",
//   "detalles": [
//     {
//       "productoId": "68d489b182a1413a9df43cf9",
//       "cantidad": 2
//     },
//     {
//       "productoId": "68d489e282a1413a9df43cfb",
//       "cantidad": 1
//     }
//   ]
// }