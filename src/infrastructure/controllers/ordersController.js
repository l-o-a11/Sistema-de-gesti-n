// Importa los casos de uso (lógica de negocio) relacionados con pedidos
import CreateOrder from "../../application/use-cases/orders/CreateOrder.js";
import GetOrders from "../../application/use-cases/orders/GetOrder.js";
import GetOrderById from "../../application/use-cases/orders/GetOrderById.js";
import CancelOrder from "../../application/use-cases/orders/UpdateOrder.js";

// Controlador de Pedidos: se encarga de manejar las solicitudes HTTP relacionadas con las órdenes
export default class OrderController {
  constructor(orderRepo, productRepo) {
    // Instancia los casos de uso pasando los repositorios (inyección de dependencias)
    this.createOrder = new CreateOrder(orderRepo, productRepo);
    this.getOrders = new GetOrders(orderRepo);
    this.getOrderById = new GetOrderById(orderRepo);
    this.cancelOrder = new CancelOrder(orderRepo, productRepo);
  }

  // Crear un pedido nuevo
  create = async (req, res) => {
    try {
      const { usuarioId, detalles } = req.body; // datos enviados en el request
      const order = await this.createOrder.execute(usuarioId, detalles); // ejecuta el caso de uso
      res.status(201).json(order); // responde con el pedido creado
    } catch (error) {
      res.status(400).json({ error: error.message }); // error de validación o negocio
    }
  };

  // Obtener todos los pedidos
  getAll = async (req, res) => {
    const orders = await this.getOrders.execute(); // trae todos los pedidos
    res.json(orders); // responde con la lista
  };

  // Obtener un pedido por su ID
  getById = async (req, res) => {
    const order = await this.getOrderById.execute(req.params.id); // busca por id
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" }); // no existe
    res.json(order); // devuelve el pedido
  };

  // Cancelar un pedido existente
  cancel = async (req, res) => {
    try {
      const order = await this.cancelOrder.execute(req.params.id); // ejecuta la cancelación
      res.json(order); // responde con el pedido actualizado
    } catch (error) {
      res.status(400).json({ error: error.message }); // error si no se puede cancelar
    }
  };
}
