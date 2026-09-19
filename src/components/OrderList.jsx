import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllOrders,
  getAllUsers,
  createOrder,
  deleteOrder,
} from "../services/requests";
import HorizontalTableOrder from "./HorizontalTableOrder";
import VerticalTableOrder from "./VerticalTableOrder";
import OrderCreateModal from "./OrderCreateModal";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = () => {
    getAllOrders().then((res) => {
      if (!res.hasExternalError) {
        setOrders(res.data.data);
      }
    });
  };

  useEffect(() => {
    fetchOrders();
    getAllUsers().then((res) => {
      if (!res.hasExternalError) {
        setCustomers(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = orders.filter(
      (sug) =>
        String(sug.id).includes(query) ||
        sug.status.toLowerCase().includes(query.toLowerCase()) ||
        sug.paymentMethod.toLowerCase().includes(query.toLowerCase()),
    );
    setSuggestions(filtered);
  }, [query, orders]);

  const handleViewDetail = (orderId) => navigate(`/pedido/${orderId}`);

  const handleDelete = async (orderId) => {
    if (!window.confirm(`¿Eliminar el pedido #${orderId}?`)) return;
    const res = await deleteOrder(orderId);
    if (!res.hasExternalError) fetchOrders();
  };

  const handleCreate = async (orderPayload) => {
    const res = await createOrder(orderPayload);
    if (!res.hasExternalError) {
      setShowModal(false);
      fetchOrders();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Pedidos</h1>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Nuevo pedido
        </button>
      </div>

      <div className="mb-3 position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID, estatus o metodo de pago..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() !== "" && (
          <ul
            className="list-group position-absolute w-100 shadow"
            style={{ zIndex: 10 }}
          >
            {suggestions.length === 0 ? (
              <li className="list-group-item text-muted">Sin resultados</li>
            ) : (
              suggestions.map((sug) => (
                <li
                  key={sug.id}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleViewDetail(sug.id)}
                >
                  Pedido #{sug.id} — {sug.status} — ${sug.total}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <div className="d-none d-md-block">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>id</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Pago</th>
              <th>Estatu</th>
              <th>Direccion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, index) => (
              <HorizontalTableOrder
                key={"h" + index}
                ord={ord}
                onViewDetail={handleViewDetail}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-md-none mt-4">
        {orders.map((o, index) => (
          <VerticalTableOrder
            key={"v" + index}
            o={o}
            onViewDetail={handleViewDetail}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <OrderCreateModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
        customers={customers}
      />
    </div>
  );
}

export default OrderList;
