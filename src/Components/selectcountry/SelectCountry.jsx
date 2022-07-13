import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import "./SelectCountry.scss";
import countries from "./country";
import { Typography } from "@mui/material";
export default function SelectCountry({
  setcountry,
  setcountryname,
  incrementpage,
}) {
  //prerender
  const [inputValue, setInputValue] = useState("");
  const countryhandler = () => {
    countries.map((values) => {
      if (values.label === inputValue) {
        setcountry(values.code);
        return;
      }
    });
    setcountryname(inputValue);
    incrementpage("2");
  };
  //render
  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={"18px"} mb={"18px"} component={"h3"}>
        Please Select your Country
      </Typography>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={countries}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <br />
      <Button variant="contained" color="success" onClick={countryhandler}>
        Done
      </Button>
    </Container>
  );
}
