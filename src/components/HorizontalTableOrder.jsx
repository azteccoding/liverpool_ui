const HorizontalTableOrder = ({ ord, onViewDetail, onDelete }) => {
  return (
    <tr>
      <td>{ord.id}</td>
      <td>{ord.date}</td>
      <td>${ord.total}</td>
      <td>{ord.paymentMethod}</td>
      <td>{ord.status}</td>
      <td>{ord.address}</td>
      <td>
        <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => onViewDetail(ord.id)}
        >
          Ver detalle
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(ord.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default HorizontalTableOrder;
