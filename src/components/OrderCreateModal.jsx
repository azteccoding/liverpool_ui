import { useState } from "react";

const emptyItem = { sku: "", quantity: 1, productName: "", unitPrice: 0 };

const OrderCreateModal = ({ show, onClose, onCreate, customers }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Tarjeta",
    status: "Procesando",
    address: "",
    customerId: customers[0]?.id ?? "",
  });
  const [items, setItems] = useState([{ ...emptyItem }]);

  if (!show) return null;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }]);

  const removeItem = (index) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  const total = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
    0,
  );

  const handleSubmit = () => {
    const productsList = items.map((item) => ({
      sku: item.sku,
      quantity: Number(item.quantity),
      productName: item.productName,
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.quantity) * Number(item.unitPrice),
    }));

    onCreate({
      id: Math.floor(Math.random() * 1000000) + 1000,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      status: formData.status,
      address: formData.address,
      customerId: Number(formData.customerId),
      productsList,
      total,
    });
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div
        className="bg-white rounded p-4"
        style={{
          maxWidth: 600,
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h4 className="mb-3">Nuevo pedido</h4>

        <div className="mb-2">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => handleFieldChange("date", e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Ciiente</label>
          <select
            className="form-select"
            value={formData.customerId}
            onChange={(e) => handleFieldChange("customerId", e.target.value)}
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Metodo de pago</label>
          <select
            className="form-select"
            value={formData.paymentMethod}
            onChange={(e) => handleFieldChange("paymentMethod", e.target.value)}
          >
            <option value="Tarjeta">Tarjeta</option>
            <option value="Oxxo">Oxxo</option>
            <option value="Puntos">Pts Liverpool</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Estatus</label>
          <select
            className="form-select"
            value={formData.status}
            onChange={(e) => handleFieldChange("status", e.target.value)}
          >
            <option value="Procesando">Procesando</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Direccion de envío</label>
          <input
            type="text"
            className="form-control"
            value={formData.address}
            onChange={(e) => handleFieldChange("address", e.target.value)}
          />
        </div>

        <h5>Productos</h5>
        {items.map((item, index) => (
          <div key={index} className="row g-2 mb-2 align-items-end">
            <div className="col-3">
              <label className="form-label small">SKU</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={item.sku}
                onChange={(e) => handleItemChange(index, "sku", e.target.value)}
              />
            </div>
            <div className="col-3">
              <label className="form-label small">Producto</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={item.productName}
                onChange={(e) =>
                  handleItemChange(index, "productName", e.target.value)
                }
              />
            </div>
            <div className="col-2">
              <label className="form-label small">Cant.</label>
              <input
                type="number"
                min="1"
                className="form-control form-control-sm"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
            </div>
            <div className="col-2">
              <label className="form-label small">Precio</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="form-control form-control-sm"
                value={item.unitPrice}
                onChange={(e) =>
                  handleItemChange(index, "unitPrice", e.target.value)
                }
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-sm btn-outline-danger w-100"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
        <button
          className="btn btn-sm btn-outline-primary mb-3"
          onClick={addItem}
        >
          + Agregar producto
        </button>

        <p className="fw-bold">Total: ${total.toFixed(2)}</p>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={handleSubmit}>
            Crear pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCreateModal;
