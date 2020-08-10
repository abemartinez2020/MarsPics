const axios = require('axios');
const key = process.env.NASA_API_KEY;

const photoDate = ({rover, date}, callback) => {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${key}`;

    axios.get(url).then((response) => {
        callback(undefined, response.data);
    })
    .catch((error) => {
        callback(error, undefined);
    })
    .finally( () => {

    })
}

module.exports = photoDate;