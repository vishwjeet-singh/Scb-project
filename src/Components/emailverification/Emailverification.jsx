import React from "react";
import { useState } from "react";
import "./Emailverification.scss";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
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
  //STATES

  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [generatedotp, setGeneratedotp] = useState("");
  const [otp, setOtp] = useState("");
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otppanel, setOtppanel] = useState(false);

  //EFFECTS

  //FUNCTIONS

  const handlevalidate = () => {
    let message = "";
    let isValid = false;
    if(email.split("@").length-1 >= 2){
      toast.error("can't have more than one @ in email");
      return;
    }
    if(email.split(".").length-1 >= 2){
      toast.error("can't have more than one . in email");
      return;
    }
    let st = email.split("@");//split the email into two parts
    if (st.length < 2) { 
      //if the email is not valid
      message = "Email id must contain @";
      toast.error(message);
      isValid = false;

      
    } else {
      let st2 = st[1].split(".");
      if (st2.length < 2) {
        //if the email doesnt contains anything after .
        message = "Email id must contain . followed by a domain";
        toast.error(message);
        isValid = false;
      } else {
        //if the email is valid
        if (st2[0].length != 0 && st2[1].length != 0) {
          //if emails contain string after @ and . and also no string in between.
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
  const sendEmail = () => {
    setLoading(true);
    let str = "";
    for (var i = 0; i < 6; i++) {
      //creating a string of 6 random numbers
      //this is created during runtime so this otp is secure
      let k = Math.floor(Math.random() * 9) + 1;
      str += k;
    }
    // otp is generated and stored in the state
    setGeneratedotp(str);
    var templateParams = {
      from_name: "SCB",
      to_name: email,
      message: str,
      email: email,
    };
    // sending the otp to the email
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
  //this function is called when the user enters and clicks verify the otp
  const verifyOtp = () => {
    if (generatedotp === otp) {
      toast.success("Email is verified ");
      setComplete(true);
    } else {
      toast.error("Incorrect otp");
    }
  };

  //RENDER


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
