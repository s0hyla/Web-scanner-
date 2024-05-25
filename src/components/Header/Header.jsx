import logo from "./../../assets/images/touch.png";
import "./Header.css";
function Header() {
  return (
    <header className="header">
      <h1>CMS</h1>
      <img src={logo} title="logo" alt="Shiny" /> <h1>Scanner</h1>
    </header>
  );
}

export default Header;
