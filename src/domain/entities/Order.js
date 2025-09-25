export default class Order {
  constructor({ 
    id, 
    usuarioId, 
    total, 
    estado = "activo", 
    createdAt = new Date(), 
    detalles = [] 
  }) {
    // ✅ Validaciones
    if (!usuarioId) {
      throw new Error("El usuarioId es obligatorio");
    }

    if (total == null || total < 0) {
      throw new Error("El total no puede ser negativo ni nulo");
    }

    if (!["activo", "cancelado"].includes(estado)) {
      throw new Error("El estado debe ser 'activo' o 'cancelado'");
    }

    if (!Array.isArray(detalles)) {
      throw new Error("Los detalles deben ser un arreglo de OrderDetail");
    }

    // 🔑 Asignación de propiedades
    this.id = id;                        // Identificador único de la orden
    this.usuarioId = usuarioId;          // Usuario que hizo la orden
    this.total = total;                  // Total calculado de la orden
    this.estado = estado;                // Estado del pedido: activo/cancelado
    this.createdAt = createdAt;          // Fecha de creación
    this.detalles = detalles;            // Lista de OrderDetail (productos comprados)
  }

  // 💡 Método extra: recalcular total basado en los detalles
  calcularTotal() {
    this.total = this.detalles.reduce(
      (sum, detalle) => sum + detalle.subtotal, 
      0
    );
    return this.total;
  }
}
