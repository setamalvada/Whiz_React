import { profile } from "../../services/api.service";
import React from "react";
import { Link } from "react-router-dom";
import UserDetailCard from "./UserDetailCard";
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";
import axios from "axios";
import "./user.css";

class UserProfile extends React.Component {
  state = {
    user: "",
  };

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios.get(`/user/${this.props.match.params.id}`).then((response) => {
      console.log(response.data);
      this.setState({ user: response.data });
    });
  }

  render() {
    const user = this.state.user;
    console.log(user);
    return (
      <div className="background-themeProf">
        <img class="teamcardProf" src={user.avatar} alt="Card image cap" />
        <div className="usernameProf">{user.username}</div>
        <div className="nowrapProf">{user.counter} places conquered</div>
        <div className="nowrapProf">Faction: {user.team}</div>
        {/* <button className="User__button">Edit profile</button> */}
      </div>
    );
  }
}

export default UserProfile;

{
  /* <div class="flex-container">
<div>
<img class="teamcard" src={avatar} alt="Card image cap" />  
</div>
<div class="teamcard">      
<h4 class="username">{username}</h4>
<p class="nowrap">Faction: {team}</p>
<p class="nowrap">{counter} places hacked</p>
<a href={`/user/${id}`} class="myButton">
  Vier profile
</a>
</div>

</div> */
}
