/**
 * Created by simvolice on 21.07.2017 13:50
 */

const request = require('request');
const util = require('util');
const requestPromise = util.promisify(request);



module.exports = {

  getWeather: async () => {


    let resultForBot = {};


      let response = await requestPromise('http://api.openweathermap.org/data/2.5/find?q=Astana&type=accurate&mode=json&lang=ru&units=metric&appid=0f3d04b29fb15ff8fdc8e030aad094a2');

      if(response.statusCode === 200){





        resultForBot.temp = JSON.parse(response.body).list[0].main.temp;
        resultForBot.description = JSON.parse(response.body).list[0].weather[0].description;




        return `${resultForBot.temp}°, ${resultForBot.description}`;


      } else {




        return 'Извините, но сервер погоды, временно не отвечает, попробуйте позже.';





      }














  }








};