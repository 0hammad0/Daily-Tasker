import { Outlet, Navigate } from "react-router-dom";
import { useAuthStateContext } from "../Context/AuthContext";

const GuestLayout = () => {
  const { token } = useAuthStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default GuestLayout;
