const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5210d423dc54b1796570425244769f03&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to connect", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike} Degrees. The humidity is ${body.current.humidity}%. `
      );
    }
  });
};

module.exports = forecast;
