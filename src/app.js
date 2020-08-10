const path = require('path');
const express = require('express');
const photoDate = require('../utils/photoDate');

const app = express();
const port = process.env.PORT;

//Define paths for Express config
 const publicDirectoryPath = path.join(__dirname, '../public');


 //Setup static directory to serveS
 app.use(express.static(publicDirectoryPath));

 app.get('', (req, res) => {
     res.render('index');
 })

 app.get('/photos', (req, res) => {
    photoDate(req.query, (error, response) => {
        if(error) {
            return res.send({error: error});
        } else {
            res.send( response);
        }
            
    })
 })

 //Start the server up
 app.listen(port, ()=> {
     console.log('Server started correctly. Running on port'+ port);
 })