import CreateProducto from "../../application/use-cases/producto/CreateProduct.js";
import GetProductos from "../../application/use-cases/producto/GetProduct.js";
import GetProductoById from "../../application/use-cases/producto/GetProductById.js";
import UpdateProducto from "../../application/use-cases/producto/UpdateProduct.js";
import DeleteProducto from "../../application/use-cases/producto/DelteProduct.js"; // <- ojo, parece un typo: "DelteProduct"
import ProductoRepositoryMongo from "../repositories/ProductoRepositoryMongo.js";

// Repositorio que conecta con MongoDB
const repo = new ProductoRepositoryMongo();

// Crear un nuevo producto
export const createProducto = async (req, res) => {
  try {
    const uc = new CreateProducto(repo); // Caso de uso CreateProduct
    const newProducto = await uc.execute(req.body);
    res.status(201).json(newProducto); // Devuelve el producto creado
  } catch (err) {
    res.status(400).json({ error: err.message }); // Error de validación
  }
};

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const uc = new GetProductos(repo); // Caso de uso GetProduct
    const productos = await uc.execute();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error interno
  }
};

// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  try {
    const uc = new GetProductoById(repo);
    const producto = await uc.execute(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  try {
    const uc = new UpdateProducto(repo);
    const updated = await uc.execute(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message }); // Error de validación
  }
};

// Eliminar un producto
export const deleteProducto = async (req, res) => {
  try {
    const uc = new DeleteProducto(repo);
    const result = await uc.execute(req.params.id);
    if (!result) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
