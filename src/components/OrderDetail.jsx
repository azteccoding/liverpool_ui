import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllOrders,
  getAllUsers,
  patchOrder,
  deleteOrder,
} from "../services/requests";
import ProductsDetail from "./ProductsDetail";
import ClientDetails from "./ClientDetails";
import OrderDetailData from "./OrderDetailData";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    getAllOrders().then((res) => {
      if (!res.hasExternalError) {
        const found = res.data.data.find((o) => String(o.id) === id);
        if (found) {
          setOrder(found);
          setFormData(found);
        } else {
          setNotFound(true);
        }
      }
    });
  }, [id]);

  useEffect(() => {
    if (!order) return;
    getAllUsers().then((res) => {
      if (!res.hasExternalError) {
        const found = res.data.data.find((u) => u.id === order.customerId);
        setCustomer(found || null);
      }
    });
  }, [order]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const res = await patchOrder(order.id, {
      status: formData.status,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
    });
    if (!res.hasExternalError) {
      setOrder(res.data.data);
      setFormData(res.data.data);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setFormData(order);
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar el pedido #${order.id}?`)) return;
    const res = await deleteOrder(order.id);
    if (!res.hasExternalError) {
      navigate("/");
    }
  };

  if (notFound) {
    return (
      <div className="container mt-4">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate("/")}
        >
          ← Volver
        </button>
        <p>No se encontró el pedido #{id}</p>
      </div>
    );
  }

  if (!order) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          ← Volver
        </button>
        <div>
          {editMode ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Guardar
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary me-2"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>

      <h1>Pedido #{order.id}</h1>

      <div className="row">
        <OrderDetailData
          order={editMode ? formData : order}
          editMode={editMode}
          onFieldChange={handleFieldChange}
        />
        <ClientDetails customer={customer} />
      </div>

      <ProductsDetail order={order} />
    </div>
  );
}

export default OrderDetail;
