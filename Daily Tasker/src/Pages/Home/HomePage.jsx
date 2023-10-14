import { useAuthStateContext } from "../../Context/AuthContext";
import axiosClient from "../../API/ClientAPI";

const HomePage = () => {
  const { setUser, setToken } = useAuthStateContext();

  const logout = () => {
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default HomePage;
