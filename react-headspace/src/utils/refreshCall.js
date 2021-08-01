import axios from "axios";

export const refreshToken = () => {
  axios.post('http://localhost:8000/refresh-token-auth/', {
    'token': `${localStorage.getItem('token')}`
  })
    .then(res => {
      localStorage.setItem('token', res.data.token);
    })
}