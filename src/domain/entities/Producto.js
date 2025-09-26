class Producto {
    constructor({ nombre, descripcion, precio, stock,categoria }) {
      this.nombre = nombre;
      this.descripcion = descripcion;
      this. precio =  precio;
      this.stock = stock;
      this.categoria = categoria;
      this.createAt = new Date();
    }
  }
  export default Producto;
  