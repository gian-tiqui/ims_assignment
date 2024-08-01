import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Section from "../../components/Section";

const Autobase = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("autobase");
    navigate("/login");
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <Section />
    </div>
  );
};

export default Autobase;
//dev
