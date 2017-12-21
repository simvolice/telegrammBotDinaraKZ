/**
 * Created by simvolice on 21.07.2017 13:50
 */


const request = require('request');
const util = require('util');
const requestPromise = util.promisify(request);
const cheerio = require('cheerio');


async function convertFarengeihtToCelsiy(number) {

    let result = (5/9) * (parseInt(number) - 32);

    return result.toFixed(0);


};


module.exports = {

  getWeather: async (coordinate) => {


    let coord = coordinate.join(",");


    let response = await requestPromise('https://weather.com/weather/today/l/' + coord + "?par=google");




    if (response.statusCode === 200) {
        const $ = cheerio.load(response.body);


       let resultTemperatureInCelsiy = await convertFarengeihtToCelsiy($('div.today_nowcard-temp').text());




       return `${resultTemperatureInCelsiy}°`;

    } else {

        return "Сервер погоды временно не отвечает, повторите свой запрос еще раз";
    }




  }








};