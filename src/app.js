const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT  = process.env.PORT || 3000;

const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ranjith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ranjith'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ranjith'
    })
})

app.get('/weather', (req, res) => {
    let { address } = req.query;
    
    if (!address) {
        res.send(
            { error: "You must give the address!" }
        )
    }
    else {
        geocode(address, (error, data) => {
            const { longtitude, latitude, place } = data || {};

            if (error) {
                res.send({ error });
            }
            else {
                forecast(latitude, longtitude, (error, forecastData) => {
                    if (error) {
                        res.send({ error });
                    }
                    else {
                        res.send({
                            place,
                            longtitude,
                            latitude,
                            forecastData
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ranjith',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ranjith',
        errorMessage: 'Page not found.'
    })
})

app.listen(PORT, () => {
    console.log(`Server is up on test port: ${PORT}`);
});
