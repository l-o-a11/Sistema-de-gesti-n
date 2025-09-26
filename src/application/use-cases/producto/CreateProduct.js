import Producto from "../../../domain/entities/Producto.js";

export default class CreateProducto {
    constructor(productoRepository, passwordEncrypter) {
      this.productoRepository = productoRepository;
      this.passwordEncrypter = passwordEncrypter;
    }
  
    async execute(productoData) {
      const producto = new Producto(productoData);
      const { nombre, descripcion, precio, stock,categoria, createAt } = producto;

      const productoToSave = {
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      createAt
    };

      return await this.productoRepository.create(productoToSave);
    }
}  

// {
//     "nombre" : "Fresas",
//       "descripcion":"Fruta de color rojo, dulce",
//       "precio": "4000",
//       "stock":"40",
//       "categoria":"frutas y verduras"
// }