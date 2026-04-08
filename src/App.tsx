import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useGetCheckAuthServiceQuery } from "./services/react-query/checkAuth/query/useCheckAuthServiceQuery";
import { useEffect, useState } from "react";
import ProductDetailPage from "./pages/ProductDetailPage";
import HomePageSkeleton from "./components/ui/skeletons/HomePageSkeleton";
import InitialLoading from "./components/ui/loaders/InitialLoading";

function App() {
  const { data: checkAuth, isLoading } = useGetCheckAuthServiceQuery();
  const { setAuthUser } = useAuthStore();
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    if (checkAuth) {
      setAuthUser(checkAuth);
    }
  }, [checkAuth, setAuthUser]);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setShowSlowMessage(true), 5000);
    return () => {
      clearTimeout(timer);
      setShowSlowMessage(false);
    };
  }, [isLoading]);

  if (isLoading && checkAuth === undefined) {
    return (
      <>
        <HomePageSkeleton />
        {showSlowMessage && <InitialLoading />}
      </>
    );
  }

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
