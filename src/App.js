import "./App.css";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/sign-up/SignUp";
import Header from "./components/header/Header";
import Map from "./components/map/Map";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// import ProductList from "./components/product-list/ProductList";
// import AuthenticatedRoute from "./components/authenticated-route/AuthenticatedRoute";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const onLogIn = (loggedInUser) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const onSignUp = (notRegisteredUser) => {
    localStorage.setItem("user", JSON.stringify(notRegisteredUser));
    setUser(notRegisteredUser);
  };

  const onLogOut = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <div className="App">
      <Header user={user} onLogOut={onLogOut} />
      <div className="App__screenWrapper">
        <Switch>
          {/* <AuthenticatedRoute
            path="/products"
            render={(props) => <ProductList {...props} user={user} onLogOut={onLogOut} />}
            user={user}
          /> */}
           {/* <AuthenticatedRoute
            path="/map"
            render={(props) => <Map {...props} user={user} onLogOut={onLogOut} />}
            user={user}
          /> */}
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} user={user} onLogIn={onLogIn} />
            )}
          />
           <Route 
        path="/map"
       component={Map}
          />
          <MuiThemeProvider>
          <Route
            path="/signup"
            render={(props) => (
              <SignUp {...props} user={user} onSignUp={onSignUp} />
            )}
          />
          </MuiThemeProvider>
       
        </Switch>
      </div>
    </div>
  );
}
export default App;