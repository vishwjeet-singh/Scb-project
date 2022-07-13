import React from "react";
import { useState, useEffect } from "react";
import "./Emailverification.scss";
import { auth } from "../../../firebase";
import emailjs from "emailjs-com";
import {
  getAuth,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import actionCode from "./ActionCode";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
  LinearProgress,
} from "@mui/material";
export default function Emailverification() {
  //states

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [generatedotp, setGeneratedotp] = useState("");
  const [otp, setOtp] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otppanel, setOtppanel] = useState(false);

  //effects
  // useEffect(() => {
  //   // Get the saved email
  //   const saved_email = window.localStorage.getItem("emailForSignIn");

  //   // Verify the user went through an email link and the saved email is not null
  //   if (isSignInWithEmailLink(window.location.href) && !! saved_email) {
  //     // Sign the user in
  //     signInWithEmailLink(saved_email, window.location.href);
  //   }

  // }, [])

  //functions

  const handlevalidate = () => {
    let message = "";
    let isValid = false;
    let st = email.split("@");
    if (st.length < 2) {
      message = "Email id must contain @";
      toast.error(message);
      isValid = false;
    } else {
      let st2 = st[1].split(".");

      if (st2.length < 2) {
        message = "Email id must contain . followed by a domain";
        toast.error(message);
        isValid = false;
      } else {
        if (st2[0].length != 0 && st2[1].length != 0) {
          isValid = true;
          message = "valid email! Lets verify it!";
          toast.success(message);
        } else {
          message = "invalid email";
          toast.error(message);
          isValid = false;
        }
      }
    }
    setValid(isValid);
  };
  const trySignIn = async () => {
    const auth = getAuth();
    await sendSignInLinkToEmail(auth, email, actionCode)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        console.log("email sent");
        console.log(email);
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ...
      });
  };
  const handleverification = () => {
    handlevalidate();
    if (error != "valid email! Lets verify it!") {
      setError("validate email first");
      return;
    }
    trySignIn();
  };

  const sendEmail = () => {
    setLoading(true);
    let str = "";
    for (var i = 0; i < 6; i++) {
      let k = Math.floor(Math.random() * 9) + 1;
      str += k;
    }
    setGeneratedotp(str);
    var templateParams = {
      from_name: "SCB",
      to_name: email,
      message: str,
      email: email,
    };

    emailjs
      .send(
        "service_slt5lzp",
        "template_ttnulwf",
        templateParams,
        "user_Ta5odI3Okau8bfNDVMjT4"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          toast.info("Please enter otp sent to your mail");
          setLoading(false);
          setOtppanel(true);
        },
        function (error) {
          console.log("FAILED...", error);
          toast.error(error);
          setLoading(false);
        }
      );
  };

  const verifyOtp = () => {
    if (generatedotp === otp) {
      toast.success("Email is verified ");
      setComplete(true);
    } else {
      toast.error("Incorrect otp");
    }
  };

  //render

  return (
    <div className="email-verification">
      <Stack mt={2} spacing={2}>
        <Typography variant="h4" component="h4">
          Email Verification
        </Typography>
        
        <input
          className="input-field"
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          autoComplete="current-password"
        />
        {complete && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This email is correct —<br></br>
            <strong>and in working condition</strong>
          </Alert>
        )}
        {!complete && !valid && (
          <Button variant="contained" size="small" onClick={handlevalidate}>
            validate
          </Button>
        )}
        {!complete &&
          valid &&
          (loading ? (
            <LinearProgress color="secondary"/>
          ) : (
            <Button variant="contained" color="secondary" size="small" onClick={sendEmail}>
              verify
            </Button>
          ))}
        {!complete && otppanel && (
          <React.Fragment>
            <TextField
              id="outlined-password-input"
              label="Otp"
              type="Otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              autoComplete="current-password"
            />
            {loading ? (
              <LinearProgress color="success"/>
            ) : (
              <Button variant="contained" color="success" size="small" onClick={verifyOtp}>
                Verify otp
              </Button>
            )}
          </React.Fragment>
        )}
      </Stack>
    </div>
  );
}
