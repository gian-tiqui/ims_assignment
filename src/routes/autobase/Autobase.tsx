import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Section from "../../components/Section";
import CarsContainer from "../../components/CarsContainer";
import { Helmet } from "react-helmet";

const Autobase = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("autobase");
    navigate("/login");
  };

  return (
    <div>
      <Helmet>
        <title>Car Search - Autobase</title>
      </Helmet>
      <Header onLogout={handleLogout} />
      <Section />
      <CarsContainer />
    </div>
  );
};

export default Autobase;
//dev
