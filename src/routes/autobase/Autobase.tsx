import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Section from "../../components/Section";
import CarsContainer from "../../components/CarsContainer";

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
      <CarsContainer />
    </div>
  );
};

export default Autobase;
//dev
