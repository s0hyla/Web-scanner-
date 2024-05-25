import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  //RadioInput Handlle option
  const [selectedOption, setSelectedOption] = useState("");
  const [url, setUrl] = useState("");
  // const [postResponse, setpostResponse] = useState()
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
      })
      .then((data) => {
        // console.log(data);
        const id = data.data.id;
        // setpostResponse(data)
        navigate(`../scan/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Focusing Event
  const inputReference = useRef();
  useEffect(() => {
    inputReference.current.focus();
  }, []);
  return (
    <div className="script">
      <Header />
      <div>
        <h2>CMS SCAN</h2>
        <h4>
          CMS SCAN tool designed to identify and assess vulnerabilities within a
          <br />
          content management system, helping to fortify against potential
          security risks and ensure optimal performance.
        </h4>
      </div>
      <div className="buttons">
        <input
          ref={inputReference}
          type="text"
          id="iurl"
          placeholder="URL"
          size="50"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <br />
        <div>
          <span className="iscms">isCMS :</span>
          <label className="labelro">
            <input
              className="inputro"
              type="radio"
              value="no"
              checked={selectedOption === "no"}
              onChange={handleOptionChange}
            />
            No
          </label>
          <label className="labelro">
            <input
              className="inputro"
              type="radio"
              value="yes"
              checked={selectedOption === "yes"}
              onChange={handleOptionChange}
            />
            Yes
          </label>
        </div>
        <br />
        <button>
          <Link onClick={resultScan}>Scan</Link>
        </button>
        <button>
          <Link to="/scheduleScan">Schedule Scan</Link>
        </button>
        <button className="button3">
          <Link to="/history">Recent Scan</Link>
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
