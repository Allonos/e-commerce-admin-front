import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import { useGetCheckAuthServiceQuery } from "../../../services/react-query/checkAuth/query/useCheckAuthServiceQuery";
import HomePageSkeleton from "../skeletons/HomePageSkeleton";
import InitialLoading from "../loaders/InitialLoading";

const RootLayout = () => {
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

  return <Outlet />;
};

export default RootLayout;
