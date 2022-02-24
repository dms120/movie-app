import axios from "axios";
const apiKey = process.env.REACT_APP_OMDB_API_KEY;
console.log("KEY: " + apiKey);
const api = axios.create({
    baseURL: `http://www.omdbapi.com/`
})

//export const getByID = (id:String) => api.get(`?apikey=${apiKey}&i=${id}`);
//export const getByTitle = (title:String) => api.get(`?apikey=${apiKey}&t=${title}`);
export const searchMovie = (query:String, type:String) => api.get(`?apikey=${apiKey}&s=${query}&type=${type}`);