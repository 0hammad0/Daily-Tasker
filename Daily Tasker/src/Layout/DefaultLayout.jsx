import { Navigate, Outlet } from "react-router-dom";
import { useAuthStateContext } from "../Context/AuthContext";

const DefaultLayout = () => {
  const { token } = useAuthStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
