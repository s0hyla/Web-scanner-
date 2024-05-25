import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Scan.css";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

function Scan() {
  const [result, setResult] = useState([""]);
  const [info, setInfo] = useState({});
  const [vuln, setVuln] = useState([""]);
  const [vulns, setVulns] = useState([""]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { scanId } = useParams();
  const url_info = `http://127.0.0.1:5000/cmsinfo/cmsinfo/2`;
  const url_vuln = `http://127.0.0.1:5000/cmsvuln/cmsvuln/2`;
  const url_vs = `http://127.0.0.1:5000/vulns/vulns/4`;
  const url = `http://127.0.0.1:5000/urls/url/4`;

  useEffect(() => {
    get();
    getResult();
    getvuln();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function get() {
    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Error(`HTTP status code: ${response.status}`);
      }
      const data = await response.json();
      console.log("infooooooooooo:", data);
      setInfo(data);
      setIsLoading(false);
    } catch (erorr) {
      console.error("Error : ", error);
      setError(error);
      setIsLoading(false);
    }
  }
  async function getResult() {
    try {
      const response = await fetch(url_info);
      if (response.status !== 200) {
        throw new Error(`HTTP status code: ${response.status}`);
      }
      const data1 = await response.json();
      console.log("data: ", data1);
      setResult(data1);
      setIsLoading(false);
    } catch (erorr) {
      console.error("Error : ", error);
      setError(error);
      setIsLoading(false);
    }
  }
  async function getvuln() {
    try {
      const response = await fetch(url_vuln);
      const repo = await fetch(url_vs);
      if ((response, repo.status !== 200)) {
        throw new Error(`HTTP status code: ${response.status}`);
      }
      const data2 = await response.json();
      const data3 = await repo.json();
      console.log("data2: ", data2);
      console.log("data3: ", data3);
      setVuln(data2);
      setVulns(data3);
      setIsLoading(false);
    } catch (erorr) {
      console.error("Error : ", error);
      setError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="scan">
      <Header />
      <Navbar />
      {isLoading ? (
        <p className="loading">
          <div className="spinner"></div> Loading....
        </p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="content-card">
          <h2>Scan Info</h2>
          {/* ========== end point 1 ========= */}

          <ul>
            <li>
              <span>URL: </span>
              &quot; {info.url} &quot;
            </li>
            <li>
              <span>IsCms: </span>
              &quot; {info.iscms} &quot;
            </li>
            <li>
              <span>Scan Time: </span>
              {info.scanTime}
            </li>
          </ul>

          <h4>Scan Results:</h4>
          {/* ========== end point 2 ========= */}
          {result.map((item, index) => (
            <ul key={index}>
              <li>
                <span>CMSType: </span>
                &quot;{item.name}&quot;
              </li>
              <li>
                <span>Version: </span>
                {item.version}
              </li>
              <li>
                <span>Description: </span>
                &quot;{item.description}&quot;
              </li>
              <li>
                <span>cveRelated: </span>
                {item.cveRelated}
              </li>
            </ul>
          ))}
          {/* ========== end point 3 ========= */}
          {vuln.map((item, index) => (
            <ul key={index}>
              <li>
                <span>Name: </span> &quot;{item.name} &quot;
              </li>
              <li>
                <span>{item.name}: [</span>
                {item.description}
                <span> ,remediation: </span>
                {item.remediation}
                <span> ,other: </span>
                {item.other} <span>]</span>
              </li>
            </ul>
          ))}
          {/* ========== end point 4 ========= */}
          {vulns.map((item, index) => (
            <ul key={index}>
              <li>
                <span>Name: </span>
                {item.vulnName}
              </li>
              <li>
                <span>{item.vulnName}: [</span>
                {item.description}
                <span> ,remediation: </span>
                {item.remediation}
                <span> ,other: </span>
                {item.other} <span>]</span>
              </li>
            </ul>
          ))}
          {/* <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p>
          <p>yyyyyyyyyyyyy</p> */}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Scan;
