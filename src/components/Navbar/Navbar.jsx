import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="nav">
        Home
      </Link>
    </div>
  );
}

export default Navbar;
