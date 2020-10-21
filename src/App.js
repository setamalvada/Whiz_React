import "./App.css";
import React, { useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
// import Login from "./components/login/Login";
import Header from "./components/header/Header";
// import ProductList from "./components/product-list/ProductList";
// import AuthenticatedRoute from "./components/authenticated-route/AuthenticatedRoute";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const onLogIn = (loggedInUser) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const onLogOut = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <div className="App">
      <Header user={user} onLogOut={onLogOut} />
      {/* <div className="App__screenWrapper">
        <Switch>
          <AuthenticatedRoute
            path="/products"
            render={(props) => <ProductList {...props} user={user} onLogOut={onLogOut} />}
            user={user}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} user={user} onLogIn={onLogIn} />
            )}
          />
          <Redirect to="/products" />
        </Switch>
      </div> */}
    </div>
  );
}
export default App;