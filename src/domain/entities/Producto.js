class Producto {
  constructor({ nombre, descripcion, precio, stock, categoria }) {
    // Validaciones básicas
    if (!nombre || nombre.length < 4) {
      throw new Error("El nombre del producto es obligatorio y debe tener al menos 4 caracteres");
    }

    if (!descripcion || descripcion.length < 8) {
      throw new Error("La descripción es obligatoria y debe tener al menos 8 caracteres");
    }

    if (precio == null || precio <= 0) {
      throw new Error("El precio debe ser un número mayor que 0");
    }

    if (stock == null || stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }

    if (!categoria || categoria.length < 3) {
      throw new Error("La categoría es obligatoria y debe tener al menos 3 caracteres");
    }

    // Asignaciones
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.createdAt = new Date(); 
  }
}

export default Producto;
