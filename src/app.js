const path  = require('path'); // core module
const express = require('express');
const hbs = require('hbs');

const app = express();

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'));

// define path for express config
const pathToPublicFolder = path.join(__dirname,'../public');
const viewsPath =  path.join(__dirname,'../templates/views'); 
const partialsPath = path.join(__dirname,'../templates/partials');
const utilsPath = path.join(__dirname,'../utils/');

// setup handlebars engine and view location
app.set('view engine','hbs'); // handlebars templates
app.set('views',viewsPath); // use when view folder name other than views
hbs.registerPartials(partialsPath);
//customize nodemon command for extensions : nodemon .\src\app.js -e js,hbs 

// Setup static directory to serve
app.use(express.static(pathToPublicFolder));

app.get('/', (req,res) => {
    res.render('index',{
        title : 'weather app',
        name  : 'rakesh'  
    });
}); 

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error : 'you must provide location'
        });
    }   

    const geoCode = require(utilsPath+'geocode.js')
    const weatherForcast = require(utilsPath+'forecast.js')
    geoCode(req.query.address,(error,data = {}) => {
            if(error){
                console.log(error);
                res.send({
                    error : 'Unable to find location !'  
                });
            }
            else{
                weatherForcast(data,(error,data) => {
                    if(error){
                        res.send({
                            error : 'could not get details'  
                        });
                    }
                    else{
                        console.log(data);
                        res.send({
                            title : req.query.address,
                            forecast : data,
                            location : req.query.address  
                        });
                        /*res.render('index',{
                            title : req.query.address,
                            forecast : data,
                            location : req.query.address  
                        });*/
                    }

                });
            }
        }
    );


}); 

app.get('/products', (req,res) => {
    
    if(!req.query.search){
        return res.send({
            error : 'you must provide some inputs' 
        });
    }

    res.send({
        products : [] 
    });
}); 

app.get('/help', (req,res) => {
    res.send({
        name : 'rakesh',
        location : 'Mumbai'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ralesh Purohit',
        errorMessage: 'Help article not found.'
    })
})

// 404 page
// should be placed in last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rakesh Purohit',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000'); 
});