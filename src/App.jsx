import "./App.scss";
import React from "react";
import Emailverification from "./Components/emailverification/Emailverification";
import Telephoneverification from "./Components/telephoneverification/Telephoneverification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "./Assets/lasttry.jpg";
import { Button } from "@mui/material";
function App() {
  return (
    <div className="App">
      <div className="bg-image">
        <img alt="a unique image" src={background} />
      </div>
      {/* this is the notification container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="phone-email">
        <div className="sub-div">
          {/* telephone verification container */}
          <Telephoneverification />
          {/* email verification container */}
          <Emailverification />
        </div>
        <div className="refresh-button">
          <Button variant="contained" color="secondary" onClick={()=>{window.location.reload(false)}}>Refresh</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
