import autobaseLogo from "../assets/autobaselogo.png";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="flex flex-row-reverse items-center justify-between px-5 h-28">
      <button onClick={onLogout} className="text-xl font-semibold text-white">
        Log Out
      </button>
      <div className="flex items-center gap-2">
        <img src={autobaseLogo} alt="Autobase" />
        <p className="font-sans text-2xl font-bold text-white">AUTOBASE</p>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
