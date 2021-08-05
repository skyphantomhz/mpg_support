var mqtt = require("mqtt");
var moment = require("moment");
var polyline = require("google-polyline");

var options = {
  port: 1883,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  username: "", //username
  password: "", //password
};

var client = mqtt.connect("tcp://35.185.178.47", options);

var template = {
  header: {
    did: "24:6F:28:8F:74:28", //id
    dateTime: "",
  },
  data: {
    lat: 16.0742,
    lon: 108.17687,
  },
};
// Use this link to create route
// https://developers.google.com/maps/documentation/utilities/polylineutility
client.on("connect", function () {
  var routes = polyline.decode(
    "{y`aBogjsSaQ`@gPj@`A`SsBzNhInFzLjLHhAvO{Dy@gJGgI{B_Jx@sL"
  );
  // var routes = polyline.decode( 'i{`aBegjsSUAEGG@K@GCM@G?GAE@EAG@EAG?E@CAB?M?E?G?E?E?E?E?E?E?E@G@G?A@E@A?A?A@C?A?A?A?A?A?A?A?A?A@C?A?A?A?A?A?A?A?A??A@@E?A?A?A?A?A?A?A?A?A?A?A?A@A?A?A?A???AAA?A?A?A?A@AAA?A?A?AAA?A?A?A?A?A?A?A?oBD_CPiBRyBD}@HaAD]@a@So@PEjK?tAGrDWdDwAtCf@bClApApCfBvBdBhBv@dA~Bj@d@jBrAn@p@h@j@bArApBk@fAs@`Bc@t@i@zADz@Gr@_@@q@f@U?g@Ue@IYMWGYKo@C]AYAQCOA[Ic@?_@@_A?O?Q?O?U?KCM@MAO?IAM?QAQA[?ICM?MAQAW?MCc@?G?K?YCO?W@QCSAUEMBYCQCg@AS?]Cc@A_@Aa@BQAQ?O?UEMCOAM@S?SCO?K@IGOAO?Y?aA?{@ByAgBG' )
  routes.forEach(pushMessage);
});

function pushMessage(item, index) {
  setTimeout(() => {
    template.data.lat = item[0];
    template.data.lon = item[1];
    template.header.dateTime = moment().toISOString();
    console.log(JSON.stringify(template));
    client.publish("petcare/server/gps", JSON.stringify(template));
  }, 4000 * index);
}
