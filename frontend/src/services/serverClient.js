import axios from 'axios';

const serverClient = axios.create({
  baseURL: 'https://animy.onrender.com/api', 
});

export default serverClient;