import CreateProducto from "../../application/use-cases/producto/CreateProduct.js";
import GetProductos from "../../application/use-cases/producto/GetProduct.js";
import GetProductoById from "../../application/use-cases/producto/GetProductById.js";
import UpdateProducto from "../../application/use-cases/producto/UpdateProduct.js";
import DeleteProducto from "../../application/use-cases/producto/DelteProduct.js";
import ProductoRepositoryMongo from "../repositories/ProductoRepositoryMongo.js";

const repo = new ProductoRepositoryMongo();

export const createProducto = async (req, res) => {
  try {
    const uc = new CreateProducto(repo);
    const newProducto = await uc.execute(req.body);
    res.status(201).json(newProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductos = async (req, res) => {
  try {
    const uc = new GetProductos(repo);
    const productos = await uc.execute();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

export const updateProducto = async (req, res) => {
  try {
    const uc = new UpdateProducto(repo);
    const updated = await uc.execute(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
