export default class CreateOrder {
  constructor(orderRepo, productRepo) {
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
  }

  async execute(usuarioId, detalles) {
    let total = 0;

 
for (const det of detalles) {
  const product = await this.productRepo.findById(det.productoId);
  if (!product) throw new Error(`Producto ${det.productoId} no existe`);
  if (product.stock < det.cantidad) {
    throw new Error(`Stock insuficiente para producto ${product.nombre}`);
  }

    total += det.cantidad * product.precio;
    det.precioUnitario = product.precio;

        await this.productRepo.updateStock(det.productoId, product.stock - det.cantidad);
}

    const order = await this.orderRepo.create({
      usuarioId,
      total,
      estado: "activo",
      detalles: detalles.map(d => ({
        productoId: d.productoId,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario,
        subtotal: d.cantidad * d.precioUnitario,
      }))
    });

    return order;
  }
}

// {
//   "usuarioId": "68d4621549d66e088d3cacb6",
//   "detalles": [
//     {
//       "productoId": "68d489b182a1413a9df43cf9",
//       "cantidad": 2
//     },
//     {
//       "productoId": "68d489e282a1413a9df43cfb",
//       "cantidad": 1
//     }
//   ]
// }
