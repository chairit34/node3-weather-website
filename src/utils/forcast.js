const request = require('request')

const weather = (latitude,longitude,callback)=>{
    url = 'http://api.weatherstack.com/current?access_key=415af248b120b405d036e1965f38a5a7&query='+latitude+','+longitude+'&units=m'
    request({url, json: true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Uable to find location',undefined)
        }else{
            const currentTemp = body.current.temperature
            const feelTemp = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(undefined,`${description}. It is currently ${currentTemp} degrees out. It feels like ${feelTemp} degrees out. The humidity is ${humidity}%.` );
        }
        
    })
        
}

module.exports = weather

// const url = 

// 