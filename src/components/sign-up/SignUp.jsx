import { signup } from "../../services/api.service";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm.jsx";
const FormValidators = require("./validate");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        avatar: "",
        team: "",
      },
      btnTxt: "show",
      type: "password",
      score: "0",
      redirect: false,
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });

    if (event.target.value === "") {
      this.setState((state) =>
        Object.assign({}, state, {
          score: "null",
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState((state) =>
        Object.assign({}, state, {
          score: pw.score + 1,
        })
      );
    }
  }

  submitSignup(e) {
    e.preventDefault();
    const username = this.state.user.username;
    const email = this.state.user.email;
    const password = this.state.user.password;
    const avatar = this.state.user.avatar;
    const team = this.state.user.team;

    signup(username, email, password, avatar, team)
      .then((res) => {
        if (res.success === true) {
          console.log("success");
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.assign("/login");
        } else {
          this.setState({
            errors: { message: res.message },
          });
        }
      })
      .catch((err) => {
        console.log("Sign up data submit error: ", err);
      });
    this.props.history.push('/login');
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
    } else {
      const errors = payload.errors;
      this.setState({
        errors,
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  render() {
    // const { redirect } = this.state;
    // if (redirect) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div>
        <SignUpForm
          onSubmit={(this.validateForm, this.submitSignup)}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default withRouter(SignUp);
