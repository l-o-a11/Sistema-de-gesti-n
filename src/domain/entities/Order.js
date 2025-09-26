export default class Order {
  constructor({ id, usuarioId, total, estado = "activo", createdAt = new Date(), detalles = [] }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.total = total;
    this.estado = estado;
    this.createdAt = createdAt;
    this.detalles = detalles;
  }
}