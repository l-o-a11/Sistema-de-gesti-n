export default class CancelOrder {
  constructor(orderRepo, productRepo) {
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
  }

  async execute(orderId) {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error("Pedido no encontrado");
    if (order.estado === "cancelado") throw new Error("El pedido ya está cancelado");

    // Devolver stock
    for (const det of order.detalles) {
      const product = await this.productRepo.findById(det.productoId);
      await this.productRepo.updateStock(det.productoId, product.stock + det.cantidad);
    }

    return await this.orderRepo.update(orderId, { estado: "cancelado" });
  }
}