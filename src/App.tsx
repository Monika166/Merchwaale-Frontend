import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/shared/Layout";
import Shop from "./pages/Shop";
import Customise from "./pages/Customise";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "/product/:id", element: <ProductDetail /> },
        { path: "/customise", element: <Customise /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/profile", element: <Profile /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/orders", element: <OrderHistory /> },
        { path: "/orders/:orderId", element: <OrderDetail /> },
        { path: "/admin", element: <AdminDashboard /> },
        { path: "/admin/add-product", element: <AdminAddProduct /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
