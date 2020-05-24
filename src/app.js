const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

const publicDirectory = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Uros'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Uros'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Help message',
        title: 'Help',
        name: 'Uros'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Provide address'
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            });
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            console.log(location)
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article not found',
        title: 'Help',
        name: 'Uros'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'My 404',
        title: '404',
        name: 'Uros'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})