import { useNavigate } from "react-router-dom";

const Autobase = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("autobase");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Autobase;
