const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const host = '0.0.0.0'

//Define Paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//srtup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Mohit choudhary'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Mohit choudhary'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        helpText:'THis is some helpful text.',
        title:'Help',
        name:'Mohit choudhary'
    })
})
 
app.get('/weather',(req,res) =>{
    if (!req.query.address) {
        return res.send({
            error:'Please provide address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res) =>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[ ]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Mohit',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:'404 page',
        name:'Mohit choudhary',
        errorMessage: 'Page not found'
    })
})

app.listen(process.env.PORT ||3000,host, () =>{
    console.log('Server is up on port ' + port)
})