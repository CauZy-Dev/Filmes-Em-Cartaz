import axios from 'axios';

//BASE DA API : https://api.themoviedb.org/3

//  URL DA API : /movie/now_playing?api_key=c155be9f721368a19436f9555940f3fa&language=pt-BR 

const api = axios.create({

  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;