import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "../components/UI/Toast";
import { useEffect, useRef } from "react";


const PrivateRoutes = () => {
    const auth = useSelector((state) => state.auth);
     const location = useLocation();
  const hasShownToast = useRef(false); 

  let toastId;
  useEffect(() => {
    if (!auth.auth && !hasShownToast.current) {
      toast.remove(toastId);
        toastId = toast.error("Please login first");
      hasShownToast.current = true;

      // Reset toast control on new route change
      const unlisten = () => {
        hasShownToast.current = false;
      };
      return unlisten;
    }
  }, [auth.auth]);

  return auth.auth ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoutes;
