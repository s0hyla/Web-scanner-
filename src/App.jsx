import Scan from "./views/Scan/Scan";
import History from "./views/History/History";
import "./App.css";
import Home from "./views/Home/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScheduleScan from "./views/ScheduleScan/ScheduleScan";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan/:scanId" element={<Scan />} />
        <Route path="/history" element={<History />} />
        <Route path="/scheduleScan" element={<ScheduleScan />} />
      </Routes>
    </Router>
  );
}

export default App;
