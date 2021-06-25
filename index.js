var mqtt = require('mqtt')
var polyline = require( 'google-polyline' )

var options = {
    port: 1883,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: '',//username
    password: '',//password
  };

var client  = mqtt.connect('tcp://35.185.178.47', options)

var template = {
    "header":{
      "did":""//id
    },
   "data":{
       "lat": 16.07420,
        "lon":108.17687
    }
  }
    // Use this link to create route
    // https://developers.google.com/maps/documentation/utilities/polylineutility
client.on('connect', function () {
    var routes = polyline.decode( '{y`aBogjsSaQ`@gPj@`A`SsBzNhInFzLjLHhAvO{Dy@gJGgI{B_Jx@sL' )
    routes.forEach(pushMessage)
  })


function pushMessage(item, index) {
        setTimeout(() => {
            template.data.lat = item[0];
            template.data.lon = item[1];
            console.log(JSON.stringify(template))
            client.publish('petcare/server/gps', JSON.stringify(template))
        }, 3000 * index);
  }