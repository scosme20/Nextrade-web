import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do CSS do Bootstrap

// Páginas do Cliente
import HomePage from './Pages/home/homepage.jsx';
import ClientLoginPage from './Pages/auth/client/ClientLoginPage.jsx';
import ClientRegisterPage from './Pages/auth/client/ClientRegisterPage.jsx';
import ClientDashboard from './components/dashboard/clientDashboard.jsx';

// Páginas do Fornecedor
import SupplierLoginPage from './Pages/auth/supplier/supplierLoginPage.jsx';
import SupplierRegisterPage from './Pages/auth/supplier/supplierRegisterPage.jsx';
import SupplierDashboard from './components/dashboard/supplierDashboard.jsx';

// Página de perfil genérica para diferentes papéis
import ProfileDashboard from './components/dashboard/profileDashboard.jsx';

// Configuração das rotas
const router = createBrowserRouter([
  // Rotas do Cliente
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/client/login',
    element: <ClientLoginPage />,
  },
  {
    path: '/client/register',
    element: <ClientRegisterPage />,
  },
  {
    path: '/client/dashboard',
    element: <ClientDashboard />,
  },

  // Rotas do Fornecedor
  {
    path: '/supplier/login',
    element: <SupplierLoginPage />,
  },
  {
    path: '/supplier/register',
    element: <SupplierRegisterPage />,
  },
  {
    path: '/supplier/dashboard',
    element: <SupplierDashboard />,
  },

  // Rota genérica para perfil
  {
    path: '/profile',
    element: <ProfileDashboard />, // Alterado para ProfileDashboard
  },

  // Redirecionamento para /profile
  {
    path: '/profile',
    element: <Navigate to="/profile" replace />
  }
]);

// Renderização do aplicativo
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
