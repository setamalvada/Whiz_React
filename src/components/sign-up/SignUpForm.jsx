import React from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FormLabel from "material-ui/TextField";
import RadioGroup from "material-ui/TextField";
import FormControlLabel from "material-ui/TextField";
import Radio from "material-ui/TextField";
import { Redirect } from "react-router-dom";

import PasswordStr from "./PasswordStr";
import "./style.css";

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange,
}) => {
  return (
    <div className="loginBox">
      <h4>Sign Up</h4>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          floatingLabelText="user name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        <TextField
          name="email"
          floatingLabelText="email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <TextField
          type={type}
          name="avatar"
          floatingLabelText="avatar"
          value={user.avatar}
          onChange={onChange}
        />
        <TextField
          type={type}
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />

        {/* <FormLabel component="legend">Choose your faction: </FormLabel>
  <RadioGroup aria-label="team" name="team" value={user.team} onChange={onChange}>
    <FormControlLabel value="yellow" control={<Radio />} label="Yellow" />
    <FormControlLabel value="purple" control={<Radio />} label="Purple" />
  </RadioGroup> */}

        <div className="pwStrRow">
          {score >= 1 && (
            <div>
              <PasswordStr score={score} />
              <FlatButton
                className="pwShowHideBtn"
                label={btnTxt}
                onClick={pwMask}
                style={{
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          )}
        </div>
        <TextField
          type={type}
          name="repeatPassword"
          floatingLabelText="confirm password"
          value={user.repeatPassword}
          onChange={onChange}
          errorText={errors.repeatPassword}
        />

        <TextField
          name="team"
          floatingLabelText="team"
          value={user.team}
          onChange={onChange}
          errorText={errors.team}
        />
        <br />
        <br />

        <button className="myButtonbig" type="submit">
          Submit
        </button>
      </form>
      <br />
      <p>
        Aleady have an account? <br />
        <a href="/login">Log in here</a>
      </p>
    </div>
  );
};

export default SignUpForm;
