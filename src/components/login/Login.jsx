import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { login } from "../../services/api.service";
import "./login.css";

const validations = {
  email: (v) => v.length,
  password: (v) => v.length,
};

const Login = () => {
  const [state, setState] = useState({
    data: {
      email: "",
      password: "",
    },
    error: {
      email: true,
      password: true,
    },
    touch: {},
  });

  const [loginError, setLoginError] = useState(null);

  const authContext = useAuthContext();

  const { data, error, touch } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(data);

      authContext.login(user);
    } catch (err) {
      setLoginError(err.response?.data?.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const validationFn = validations[name];
    const isValid = validationFn(value);

    setState((prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          [name]: value,
        },
        error: {
          ...prev.error,
          [name]: !isValid,
        },
      };
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setState((prev) => {
      return {
        ...prev,
        touch: {
          ...touch,
          [name]: true,
        },
      };
    });
  };

  const isError = Object.values(error).some((err) => err);
  // type="password"
  return (
    <div className="vertical-center box">
      <div className="col">
        {loginError && <div className="alert alert-danger">{loginError}</div>}
       
        <form class="inner" onSubmit={handleSubmit}>
          <div className="form-group">
            

            <input
              value={data.email}
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
              type="text"
              className={`form-control ${
                touch.email && error.email ? "is-invalid" : ""
              }`,"form-control"}
              placeholder="Enter email"
            />

            <div className="invalid-feedback">Error</div>
          </div>

          <div className="form-group">
            

            <input
              name="password"
              value={data.password}
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              className={`form-control ${
                touch.password && error.password ? "is-invalid" : ""
              }`,"form-control"}
              placeholder="Enter password"
            />

            <div className="invalid-feedback">Error</div>
          </div>

          <button type="submit" className="myButton" disabled={isError}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
