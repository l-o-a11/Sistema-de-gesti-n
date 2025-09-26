export default class OrderDetail {
  constructor({ id, pedidoId, productoId, cantidad, precioUnitario }) {
    this.id = id;
    this.pedidoId = pedidoId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.subtotal = cantidad * precioUnitario;
  }
}