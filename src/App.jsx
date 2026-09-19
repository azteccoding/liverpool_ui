import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/pedido/:id" element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
