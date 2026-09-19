const ClientDetails = ({ customer }) => {
  return (
    <>
      <div className="col-12 col-lg-6">
        <h4>Datos del cliente</h4>
        {customer ? (
          <>
            <p>
              <strong>Nombre:</strong> {customer.name}
            </p>
            <p>
              <strong>Correo:</strong> {customer.email}
            </p>
            <p>
              <strong>Cliente con tarjeta Liverpool:</strong>{" "}
              {customer.liverpoolCardHolder ? "Sí" : "No"}
            </p>
          </>
        ) : (
          <p className="text-muted">Cargando datos del cliente...</p>
        )}
      </div>
    </>
  );
};

export default ClientDetails;
