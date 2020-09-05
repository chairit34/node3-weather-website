const express = require('express')
const path = require('path')
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
//console.log(path.join(__dirname,'../public'))

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)


//Setup static directory 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Jay Benice'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'Hang me oh hang me'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About'
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude, (error,forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location,
                address
            })
        })
    })

})
app.get('help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(PORT,()=>{
    console.log('Server is up on port '+PORT)
})