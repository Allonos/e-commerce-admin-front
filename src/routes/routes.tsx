import type { RouteObject } from "react-router";

import RootLayout from "../components/ui/layout/RootLayout";
import MainLayout from "../components/ui/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AddVehiclePage from "../pages/AddVehiclePage";
import EditVehiclePage from "../pages/EditVehiclePage";
import CategoriesPage from "../pages/CategoriesPage";
import FeaturedVehiclesPage from "../pages/FeaturedVehiclesPage";

export default [
  {
    element: <RootLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignupPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "/", element: <HomePage /> },
              { path: "/vehicles/add", element: <AddVehiclePage /> },
              { path: "/vehicles/edit/:id", element: <EditVehiclePage /> },
              { path: "/product/:id", element: <ProductDetailPage /> },
              { path: "/inventory/categories", element: <CategoriesPage /> },
              { path: "/featured", element: <FeaturedVehiclesPage /> },
            ],
          },
        ],
      },
    ],
  },
] as RouteObject[];
