import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ScheduleScan.css";

function ScheduleScan() {
  const inputReference = useRef();
  useEffect(() => {
    inputReference.current.focus();
  }, []);
  const [selectedOption, setSelectedOption] = useState("");
  const [url, setUrl] = useState("");
  const [time, setTime] = useState("");
  let navigate = useNavigate();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const resultScan = (event) => {
    console.log("resultScan");
    event.preventDefault();
    axios
      .post("http://127.0.0.1:5000/urls/urls", {
        url,
        selectedOption: selectedOption,
        time,
      })
      .then((data) => {
        console.log(data);

        const id = data.data.id;
        navigate(`../scan/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="scheduleScan">
      <Header />
      <Navbar />
      <div className="content-table">
        <h3>Schedule Scan</h3>
        <label>URL </label>
        <input
          ref={inputReference}
          type="text"
          id="iurl"
          size="50"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <br />
        <br />
        <div>
          <span className="iscms">isCMS :</span>
          <label className="labelroo">
            <input
              className="inputroo"
              type="radio"
              value="no"
              checked={selectedOption === "no"}
              onChange={handleOptionChange}
            />
            No
          </label>
          <label className="labelroo">
            <input
              className="inputroo"
              type="radio"
              value="yes"
              checked={selectedOption === "yes"}
              onChange={handleOptionChange}
            />
            Yes
          </label>
        </div>
        {/* <label>DATE</label>
        <input type="text" id="iurl" size="50" /> */}
        <br />
        <label> SCAN TIME</label>
        {/* <input type="text" id="iurl" size="50" /> */}
        {/* <input type="text" id="iurl" size="50" /> */}
        <input
          type="datetime-local"
          id="iurl"
          size="50"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <br />
        {/* <input type="dat" name="datetime" id="datetime" /> */}
        <button className="submit">
          <Link onClick={resultScan}>Submit</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ScheduleScan;
