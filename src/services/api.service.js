import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010";
// axios.defaults.withCredentials = true;  Very important so that cookies will be set and sent with every request

export const login = (email, password) => {
  return axios.post("/login", { email, password }).then((res) => res.data);
};

export const signup = (username,email, password,avatar,team) => {
    return axios.post("/signup", { username,email, password,avatar,team }).then((res) => res.data);
  };

//   submitSignup(user) {
//     var params = { username: user.usr, password: user.pw, email: user.email };
//     axios
//       .post("https://ouramazingserver.com/api/signup/submit", params)
//       .then(res => {
//         if (res.data.success === true) {
//           localStorage.token = res.data.token;
//           localStorage.isAuthenticated = true;
//           window.location.reload();
//         } else {
//           this.setState({
//             errors: { message: res.data.message }
//           });
//         }
//       })
//       .catch(err => {
//         console.log("Sign up data submit error: ", err);
//       });
//   }



export const getProducts = () => {
  return axios.get("/product").then((res) => res.data);
};

// Add whatever API calls you need here