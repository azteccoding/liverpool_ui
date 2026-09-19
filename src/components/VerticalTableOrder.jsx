const VerticalTableOrder = ({ o, onViewDetail, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Pedido #{o.id}</h5>
        <p className="card-text mb-1">
          <strong>Fecha:</strong> {o.date}
        </p>
        <p className="card-text mb-1">
          <strong>Total:</strong> ${o.total}
        </p>
        <p className="card-text mb-1">
          <strong>Pago:</strong> {o.paymentMethod}
        </p>
        <p className="card-text mb-1">
          <strong>Estatus:</strong> {o.status}
        </p>
        <p className="card-text mb-2">
          <strong>Dirección:</strong> {o.address}
        </p>
        <button
          className="btn btn-sm btn-primary w-100 mb-2"
          onClick={() => onViewDetail(o.id)}
        >
          Ver detalle
        </button>
        <button
          className="btn btn-sm btn-danger w-100"
          onClick={() => onDelete(o.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default VerticalTableOrder;
