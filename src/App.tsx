import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useGetCheckAuthServiceQuery } from "./services/react-query/checkAuth/query/useCheckAuthServiceQuery";
import { useEffect } from "react";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  const { data: checkAuth } = useGetCheckAuthServiceQuery();
  const { setAuthUser } = useAuthStore();

  useEffect(() => {
    if (checkAuth) {
      setAuthUser(checkAuth);
    }
  }, [checkAuth, setAuthUser]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={checkAuth ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={checkAuth ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route path="/" element={checkAuth ? <HomePage /> : <LoginPage />} />
        <Route
          path="/product/:id"
          element={checkAuth ? <ProductDetailPage /> : <LoginPage />}
        />
      </Routes>
    </>
  );
}

export default App;
