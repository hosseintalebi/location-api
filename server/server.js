const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

// Local imports
require('./config/config')
const { mongoose } = require('./db/mongoose')
const { Country } = require('./models/country')
const { Region } = require('./models/region')

const app = express()

const port = process.env.PORT || 3000
// set middleware for express
app.use(bodyParser.json())

// allow websites from other domains to access this service
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.post('/countries', (req, res) => {
    const country = new Country({
        name: req.body.name,
        code: req.body.code,
    })
    country.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })  
})

app.get('/countries', (req, res) => {
    Country.find().then((countries) => {
        res.send({
            countries,
        })
    }, (err) => {
        res.status(400).send(err)
    })
})

app.post('/regions', (req, res) => {
    const regions = _.map(req.body, (_region) => {
         const region = new Region({
            region: _region.region,
            country: _region.country
        })
        return region.save()
    })

    Promise.all(regions).then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.get('/regions/:country', (req, res) => {
    const country = req.params.country
    Region.find({country}).then((regions) => {
        res.send({
            regions,
        })
    }, (err) => {
        res.status(400).send(err)
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

module.exports = {
    app,
}