const ProductsDetail = ({ order }) => {
  return (
    <>
      <h4 className="mt-4">Productos</h4>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.productsList.map((item, idx) => (
              <tr key={idx}>
                <td>{item.sku}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice}</td>
                <td>${item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsDetail;
