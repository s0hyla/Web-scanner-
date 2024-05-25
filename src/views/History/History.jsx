import "./History.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

function History() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://127.0.0.1:5000/urls/urls";
  // let navigate = useNavigate();

  useEffect(() => {
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getResult() {
    try {
      const response = await fetch(url);
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
  //--------------- Delete Product -----------------
  const DeleteHist = (hist) => {
    Swal.fire({
      title: `Confirm Deletion this URL "${hist.url}" !`,
      showCancelButton: true,
    }).then((data) => {
      console.log(data);
      if (data.isConfirmed) {
        fetch(`${url}/${hist.id}`, {
          method: "DELETE",
        })
          .then((res) => {
            res.json();
          })
          .then((data1) => {
            console.log(data1);
            getResult();
          });
      }
    });
  };

  // const resultScan = (id) => {
  //   navigate(`../../scan/${id}`);
  // };
  return (
    <div className="history">
      <Header />
      <Navbar />
      <div className="content-card">
        <h3>Recent Scan</h3>
        <table>
          <thead>
            <tr className="head">
              <th>ID</th>
              <th className="url">URL</th>
              <th>IsCMS</th>
              {/* <th>TYPE</th> */}
              <th>SCAN TIME</th>
              <th>OPERATION</th>
            </tr>
          </thead>
          {isLoading ? (
            <p className="loading">
              <div className="spinner"></div> Loading....
            </p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <tbody>
              {result.map((hist, index) => (
                <tr key={index}>
                  <td>{hist.id}</td>
                  <td>{hist.url}</td>
                  <td>{hist.isCms}</td>
                  {/* <td>{hist.action}</td> */}
                  <td>{hist.scanTime}</td>
                  <td className="btns">
                    <button
                      className="delete"
                      onClick={() => {
                        DeleteHist(hist);
                      }}
                    >
                      Delete
                    </button>
                    <button className="delete">
                      <Link to={`../scan/${hist.id}`}>View</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <Footer />
    </div>
  );
}

export default History;
