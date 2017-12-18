/**
 * Created by simvolice on 21.07.2017 15:12
 */

const weather = require('./weather');
const callDB = require('./callDB');



module.exports = {

  sendArg: async (tempArr) => {

    if(tempArr.includes('погода')){






      console.log("\x1b[42m", await callDB.getCoordinate());



      return await weather.getWeather();

    } else {

      return "Я не понял Ваш запрос, попробуйте его изменить.";


    }





  }






};