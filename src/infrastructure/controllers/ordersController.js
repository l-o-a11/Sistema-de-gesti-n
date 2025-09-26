import CreateOrder from "../../application/use-cases/orders/CreateOrder.js";
import GetOrders from "../../application/use-cases/orders/GetOrder.js";
import GetOrderById from "../../application/use-cases/orders/GetOrderById.js";
import CancelOrder from "../../application/use-cases/orders/UpdateOrder.js";

export default class OrderController {
  constructor(orderRepo, productRepo) {
    this.createOrder = new CreateOrder(orderRepo, productRepo);
    this.getOrders = new GetOrders(orderRepo);
    this.getOrderById = new GetOrderById(orderRepo);
    this.cancelOrder = new CancelOrder(orderRepo, productRepo);
  }

  create = async (req, res) => {
    try {
      const { usuarioId, detalles } = req.body;
      const order = await this.createOrder.execute(usuarioId, detalles);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req, res) => {
    const orders = await this.getOrders.execute();
    res.json(orders);
  };

  getById = async (req, res) => {
    const order = await this.getOrderById.execute(req.params.id);
    if (!order) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(order);
  };

  cancel = async (req, res) => {
    try {
      const order = await this.cancelOrder.execute(req.params.id);
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
