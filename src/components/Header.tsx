interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="flex flex-row-reverse items-center justify-between px-5 h-28">
      <button onClick={onLogout} className="text-xl font-semibold text-white">
        Log Out
      </button>
      <div className="flex gap-2">
        <p className="text-white">I am logo</p>
        <p className="text-2xl font-bold text-white">AUTOBASE</p>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
