export default class GetOrderById {
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  async execute(id) {
    return await this.orderRepo.findById(id);
  }
}
