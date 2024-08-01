interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="flex flex-row-reverse items-center pt-10 justify-evenly">
      <button onClick={onLogout} className="text-2xl text-white">
        Log Out
      </button>
      <p className="text-3xl font-bold text-white">AUTOBASE</p>
      <div></div>
    </header>
  );
};

export default Header;
