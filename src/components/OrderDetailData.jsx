const OrderDetailData = ({ order, editMode, onFieldChange }) => {
  return (
    <div className="col-12 col-lg-6">
      <h4>Datos del pedido</h4>
      <p>
        <strong>Fecha:</strong> {order.date}
      </p>

      <p>
        <strong>Método de pago:</strong>{" "}
        {editMode ? (
          <select
            className="form-select d-inline-block w-auto"
            value={order.paymentMethod}
            onChange={(e) => onFieldChange("paymentMethod", e.target.value)}
          >
            <option value="Tarjeta">Tarjeta</option>
            <option value="Oxxo">Oxxo</option>
            <option value="Puntos">Pts Liverpool</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        ) : (
          order.paymentMethod
        )}
      </p>

      <p>
        <strong>Total:</strong> ${order.total}
      </p>

      <p>
        <strong>Estatus:</strong>{" "}
        {editMode ? (
          <select
            className="form-select d-inline-block w-auto"
            value={order.status}
            onChange={(e) => onFieldChange("status", e.target.value)}
          >
            <option value="Procesando">Procesando</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        ) : (
          order.status
        )}
      </p>

      <p>
        <strong>Dirección de envío:</strong>{" "}
        {editMode ? (
          <input
            type="text"
            className="form-control d-inline-block w-auto"
            value={order.address}
            onChange={(e) => onFieldChange("address", e.target.value)}
          />
        ) : (
          order.address
        )}
      </p>
    </div>
  );
};

export default OrderDetailData;
