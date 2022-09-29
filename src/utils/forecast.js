const request = require('postman-request')
const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5e90520b75ba653462404f547ad73c00&query=+'+latitude +','+longitude+'&units=m'
    request({url,json:true},(error,{body}={}) =>{
        if (error){
            callback('Unable to connect to forecast services!',undefined)
        }else if (body.error){
            callback('Unable to find forecast.write correct coordinates',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+' It is currently '+body.current.temperature+' degrees out. And it feels like '+body.current.feelslike)
        }
    })
}
module.exports=forecast