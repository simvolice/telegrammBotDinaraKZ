/**
 * Created by simvolice on 21.07.2017 15:12
 */

const weather = require('./weather');
const callDB = require('./callDB');

const request = require('request');
const util = require('util');
const requestPromise = util.promisify(request);

module.exports = {

  sendArg: async (tempArr) => {

    if(tempArr.includes('погода')){

        let allCities = [];
        for (let itemForFind of tempArr) {
           allCities.push(await callDB.getCoordinate(itemForFind))
        }




        let flattenedArr = allCities.reduce(function(prev, curr) {
            return [...prev, ...curr];
        });




        if (flattenedArr === []) {
          return "Город не найден, попробуйте изменить Ваш запрос"
        } else {

           return await weather.getWeather(flattenedArr[0].coordinate);
        }






    } else if (tempArr.includes('билет')) {

      /*let response = await requestPromise.post('https://epay.railways.kz/ktz4/proc').form({

          pa:"express3",
          sa:"GET_P62G60_EVENT",
          STEP:1,
          TIME:"0123",
          FROM_STATION:"АСТАНА-НУРЛЫ ЖОЛ(2700152)",
        TO_STATION:"Павлодар(2708900)",
        DATE:"19.01.2018"

      });

        console.log("\x1b[42m", response.body);
*/


        request.post({url:'https://epay.railways.kz/ktz4/proc', form: {pa:"express3",
                sa:"GET_P62G60_EVENT",
                STEP:1,
                TIME:"0123",
                FROM_STATION:"АСТАНА-НУРЛЫ ЖОЛ(2700152)",
                TO_STATION:"Павлодар(2708900)",
                DATE:"19.01.2018"}}, function(err,httpResponse,body){

            console.log("\x1b[42m", err);
            console.log("\x1b[42m", body);


        })


        return "Пошел поиск билетов";

    } else {

      return "Я не понял Ваш запрос, попробуйте его изменить.";


    }





  }






};