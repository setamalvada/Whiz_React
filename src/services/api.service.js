import axios from "axios";

axios.defaults.baseURL = "http://localhost:3010";
axios.defaults.withCredentials = true;  


const http = axios.create({
  baseURL: "http://localhost:3010",
  withCredentials: true
})

export const login = ({ email, password }) => http.post('/login', { email, password }).then((res) => res.data);

export const signup = (username,email, password,avatar,team) => {
    return axios.post("/signup", { username,email, password,avatar,team }).then((res) => res.data);
  };


  export const displayTeam = () => {
    return axios.get("/team/general",{ withCredentials: true } ).then((res) => res.data);
  };


  export const yellowTeam = () => {
    return axios.get("/team/yellow",{ withCredentials: true } ).then((res) => res.data);
  };

  export const purpleTeam = () => {
    return axios.get("/team/purple",{ withCredentials: true } ).then((res) => res.data);
  };
  

  export const listPlaces = () => {
    return axios.get("/map").then((res) => res.data);
  };


  export const conquer = (id) =>{
    return axios.patch(`/map/${id}`).then((res) => res.data);
  }
  
  

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



// export const getProducts = () => {
//   return axios.get("/product").then((res) => res.data);
// };

// Add whatever API calls you need here