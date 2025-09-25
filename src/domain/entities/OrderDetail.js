export default class OrderDetail {
  constructor({ id, pedidoId, productoId, cantidad, precioUnitario }) {
    // ✅ Validaciones
    if (!pedidoId) {
      throw new Error("El pedidoId es obligatorio");
    }

    if (!productoId) {
      throw new Error("El productoId es obligatorio");
    }

    if (cantidad == null || cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor que 0");
    }

    if (precioUnitario == null || precioUnitario <= 0) {
      throw new Error("El precio unitario debe ser mayor que 0");
    }

    // 🔑 Propiedades
    this.id = id;
    this.pedidoId = pedidoId;         // Referencia al pedido al que pertenece
    this.productoId = productoId;     // Referencia al producto comprado
    this.cantidad = cantidad;         // Cantidad de unidades del producto
    this.precioUnitario = precioUnitario; 
    this.subtotal = cantidad * precioUnitario; // 💰 Subtotal = cantidad × precio
  }
}
