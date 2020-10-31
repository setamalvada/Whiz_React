import "./App.css";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/sign-up/SignUp";
import Header from "./components/header/Header";
import Map from "./components/map/Map";
import TeamsStats from "./components/teams/TeamsStats";
import AuthenticatedRoute, { NotAuthenticatedRoute } from './components/aunthenticated-route/AuthenticatedRoute';
import PurpleList from "./components/teams/TeamPurple";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import YellowList from "./components/teams/TeamYellow";
import Home from "./components/home/Home";
import {useAuthContext} from "./contexts/AuthContext"
import UserProfile from "./components/user/UserProfile";


// import ProductList from "./components/product-list/ProductList";

function App() {
  const {user} = useAuthContext();

  console.log(user)
 
if(user){
  return (

    
    <div className="App">
      <Header />
      <div className="App__screenWrapper">
        <Switch>
        <Route
            exact path="/"
            component={Home}
            
          />
          <AuthenticatedRoute
            path="/team/general"
            component={TeamsStats}
          />

          <AuthenticatedRoute
            path="/team/yellow"
            component={YellowList}
          />

          <AuthenticatedRoute
            path="/team/purple"
            component={PurpleList}
          />



        <AuthenticatedRoute
            path={`/user/${user.id}`}
            component={UserProfile}
          />
        
          <NotAuthenticatedRoute
            path="/login"
            component={Login}
            
          />

          
           <AuthenticatedRoute 
        path="/map"
       component={() => <Map user={user}/> }
       
          />
         
          <MuiThemeProvider>
          <NotAuthenticatedRoute
            path="/signup"
            component={SignUp}
          />
          </MuiThemeProvider>
       
        </Switch>
      </div>
    </div>
  
  );
}else{
  return(
  <div className="App">
  <Header />
  <div className="App__screenWrapper">
    <Switch>
    <Route
        exact path="/"
        component={Home}
        
      />
      <AuthenticatedRoute
        path="/team/general"
        component={TeamsStats}
      />

      <AuthenticatedRoute
        path="/team/yellow"
        component={YellowList}
      />

      <AuthenticatedRoute
        path="/team/purple"
        component={PurpleList}
      />



    
      <NotAuthenticatedRoute
        path="/login"
        component={Login}
        
      />

      
       <AuthenticatedRoute 
    path="/map"
   component={() => <Map user={user}/> }
   
      />
     
      <MuiThemeProvider>
      <NotAuthenticatedRoute
        path="/signup"
        component={SignUp}
      />
      </MuiThemeProvider>
   
    </Switch>
  </div>
</div>
)
}
}

export default App;