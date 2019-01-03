import axios from 'axios';

const instance = axios.create({
  baseURL: "https://e-burger.firebaseio.com/"
})

export default instance;