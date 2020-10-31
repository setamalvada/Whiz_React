import { profile } from "../../services/api.service";
import React from "react";
import { Link } from "react-router-dom";
import UserDetailCard from "./UserDetailCard";
import * as V from "victory";
import { VictoryBar, VictoryChart, VictoryPie } from "victory";
import axios from "axios";

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
      <p>Hola</p>

      // <div className="UserCard">
      //   <div
      //     className="User__image"
      //     style={{ backgroundImage: `url(${user.avatar})` }}
      //   />
      //   <div className="User__name">{user.username}</div>
      //   <div className="User__price">{user.counter} places conquered</div>
      //   <div className="User__user">{user.team}</div>
      //   {/* <button className="User__button">Edit profile</button> */}
      // </div>
    );
  }
}

export default UserProfile;
