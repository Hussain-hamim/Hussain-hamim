import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./asset/logo.png";

function PrintMessage({ message, count }) {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h3>{message}</h3>
        <h1>
          your selected number is: <span style={{ color: "red" }}>{count}</span>
        </h1>
      </div>
    </>
  );
}

function App() {
  let [counters, setCounters] = useState({
    button1: 1,
    button2: 1,
    button3: 1,
  });
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  function handleClick(msg, buttonName) {
    setMessage(msg);
    setCounters((prevCounters) => ({
      ...prevCounters,
      [buttonName]: prevCounters[buttonName] + 1,
    }));
    setTimeout(() => {
      window.print();
    }, 100);
  }

  return (
    <>
      <div className="container">
        <div style={{ textAlign: "center" }} className="row">
          <div className="col-md-6 mx-auto ">
            <img
              alt="logo"
              src={logo}
              style={{ margin: "5px" }}
              width="250px"
            />
            <h1>
              <kbd>آسان خدمت ته ښهٔ راغلاست</kbd>
            </h1>
            <h3> د شمېرې اخیستنې په موخه له لاندې تڼیو څخه یوه کښېکاږئ</h3>
            <div className="container-fluid">
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-4">
            <button
              onClick={() => {
                handleClick("د زېږېدنې کارت", "button1");
                setCount(counters.button1);
              }}
              className="btn btn-outline-danger"
            >
              <h4 className="pt-4">د زېږېدنې کارت </h4>
              <br />
            </button>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                handleClick("لهٔ وېش څخه وروسته خدمتونه", "button2");
                setCount(counters.button2);
              }}
            >
              <h4 className="pt-4 pb-4">لهٔ وېش څخه وروسته خدمتونه</h4>
            </button>
          </div>

          <div className="col-md-4">
            <button
              onClick={() => {
                handleClick("برېښنايي پېژندپاڼه", "button3");
                setCount(counters.button3);
              }}
              className="btn btn-outline-danger"
            >
              <h4 className=" pt-4 pb-4">برېښنايي پېژندپاڼه</h4>
            </button>
          </div>
        </div>
        <hr />
        {message && (
          <div className="container">
            <div className="alert alert-warning">
              <PrintMessage count={count} message={message} />
            </div>
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <h5>
            د یوې تڼۍ لهٔ کښېکاږلو وروسته په راتلونکې پاڼه کې د پرېنټ تڼۍ
            کښېکاږۍ<b style={{ color: "red" }}>*</b>
          </h5>
          <p className="btn btn-outline-danger">by Rahim Rad</p>
        </div>
      </div>
    </>
  );
}

export default App;
