/**
 * @file CreateProducto.js
 * @description Caso de uso para crear un nuevo producto en la base de datos.
 * Valida y estructura los datos mediante la entidad Producto y luego
 * delega la persistencia al repositorio de productos.
 */

import Producto from "../../../domain/entities/Producto.js";

export default class CreateProducto {
    /**
     * Crea una instancia del caso de uso CreateProducto.
     * @param {Object} productoRepository - Repositorio que maneja la persistencia de productos.
     * @param {Object} passwordEncrypter - Dependencia incluida pero no utilizada (puede eliminarse si no es necesaria).
     */
    constructor(productoRepository, passwordEncrypter) {
      this.productoRepository = productoRepository;
      this.passwordEncrypter = passwordEncrypter;
    }

    /**
     * Ejecuta la creación de un nuevo producto.
     * @async
     * @function
     * @param {Object} productoData - Objeto con los datos del producto a crear.
     * @param {string} productoData.nombre - Nombre del producto.
     * @param {string} productoData.descripcion - Descripción del producto.
     * @param {number} productoData.precio - Precio del producto.
     * @param {number} productoData.stock - Stock disponible del producto.
     * @param {string} productoData.categoria - Categoría del producto.
     * @returns {Promise<Object>} Una promesa que se resuelve con el producto creado.
     */
    async execute(productoData) {
      // Validar y estructurar los datos usando la entidad Producto
      const producto = new Producto(productoData);
      const { nombre, descripcion, precio, stock, categoria, createAt } = producto;

      const productoToSave = {
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        createAt
      };

      // Guardar el producto en la base de datos a través del repositorio
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