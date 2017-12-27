/**
 * Created by simvolice on 21.07.2017 15:12
 */

const weather = require('./weather');
const railWayTickets = require('./railWayTickets');
const callDB = require('./callDB');



module.exports = {

  sendArg: async (tempArr, text) => {

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

        let allCities = [];
        const regExpForFindDate = /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d/;
        let resultForDate = text.match(regExpForFindDate);





        for (let itemForFind of tempArr) {

            allCities.push(await callDB.getNameCitis(itemForFind))
        }



        let flattenedArr = allCities.reduce(function(prev, curr) {
            return [...prev, ...curr];
        });






        if (resultForDate === null) {

            return "Вы не указали дату, укажите дату и повторите Ваш запрос.";

        } else {


            if (flattenedArr.length < 2) {
                return "Один из городов не найден, попробуйте изменить Ваш запрос"
            } else {

                return await railWayTickets.getListTickets(flattenedArr[0].name, flattenedArr[1].name, resultForDate[0]);

            }

        }







    } else {

      return "Я не понял Ваш запрос, попробуйте его изменить.";


    }





  }






};