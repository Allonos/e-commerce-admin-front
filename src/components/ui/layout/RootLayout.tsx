import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../../store/useAuthStore";
import { useGetCheckAuthServiceQuery } from "../../../services/react-query/checkAuth/query/useCheckAuthServiceQuery";
import HomePageSkeleton from "../skeletons/HomePageSkeleton";
import InitialLoading from "../loaders/InitialLoading";

const RootLayout = () => {
  const { data: checkAuth, isLoading } = useGetCheckAuthServiceQuery();
  const { setAuthUser, authUser } = useAuthStore();
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

  if (isLoading || (checkAuth && !authUser)) {
    return (
      <>
        <HomePageSkeleton />
        {showSlowMessage && <InitialLoading />}
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default RootLayout;
