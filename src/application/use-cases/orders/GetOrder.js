export default class GetOrders {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  async execute() {
    return await this.orderRepo.findAll();
  }
}
