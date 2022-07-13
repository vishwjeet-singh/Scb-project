import React from "react";
import { useState } from "react";
import "./Telephoneverification.scss";
import "react-phone-number-input/style.css";
import {
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  AlertTitle,
  LinearProgress,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import { isValidPhoneNumber  } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
export default function Telephoneverification() {
  //STATES

  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(false);
  const [otp, setOtp] = useState("");
  const [cf, setCf] = useState(null);
  const [otppanel, setOtppanel] = useState(false);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  //EFFECTS

  //FUNCTIONS
  const handlevalidate = () => {
    const isValid = isValidPhoneNumber(phone);
    var message = "";
    if (isValid) {
      message = "This is valid phone number." + " Let" + "s verify it!";
      toast.success(message);
      // configureCaptcha();
    } else {
      message = "number cannot be of " + (phone.length - 3) + " length in this country.";
      toast.error(message);
    }
    setValid(isValid);
  };
  const configureCaptcha = () => {
    setLoading(true);
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        defaultCountry: "IN",
      },
      auth
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = phone;
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        toast.info("Otp sent to your number");
        setOtppanel(true);
        setCf(confirmationResult);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Message not sent! Something went wrong");
        setLoading(false);
      });
  };
  const verifyOtp = () => {
    if (cf === null) {
      toast.error("please otp first");
    }
    setLoading(true);
    cf.confirm(otp)
      .then(() => {
        console.log("phone verified");
        toast.success("phone number verified");
        setComplete(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("invalid otp");
      });
  };

  //RENDER
  return (
    <div className="telephone-verification">
      <Stack mt={2} spacing={2}>
        <Typography variant="h4" component="h4">
          Phone verification
        </Typography>
        <PhoneInput
          className="phone-input"
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
        />

        {!complete &&
          !valid &&
          (loading ? (
            <LinearProgress />
          ) : (
            <Button variant="contained" size="small" onClick={handlevalidate}>
              Validate
            </Button>
          ))}
        {!complete && valid && (
          <FormControl variant="standard">
            <div id="sign-in-button"></div>
            {
              loading ? 
              <LinearProgress color="secondary"/>:
              <Button
                variant="contained"
                size="small"
                color="secondary"
                type="submit"
                onClick={onSignInSubmit}
              >
                Verify
              </Button>
            }
          </FormControl>
        )}
        {complete && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This phone number is correct —<br></br>
            <strong>and in working condition</strong>
          </Alert>
        )}

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
