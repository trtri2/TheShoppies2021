// DEPRECATED

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = process.env.REACT_APP_API_URL
const TYPE = "&type=movie"
const URL = API_URL + '/?apikey=' + API_KEY 
const options = {
    method: 'GET',
}
export const searchOMDBMovieByTitle = async function(searchTerm){
    var url = URL + TYPE + '&s=' + encodeURIComponent(searchTerm);
    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getOMDBMovieByID = async function(movieID){
    var url = URL + TYPE + '&i=' + encodeURIComponent(movieID);
    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(err => {
            console.log(err)
        })
}

