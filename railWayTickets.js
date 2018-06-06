/**
 * Created by simvolice on 21.12.2017 20:31
 */


const request = require('request-promise-native');
const querystring = require('querystring');
const cheerio = require('cheerio');



async function generateObjForHeaderTable(headerTableRawHTML) {

    let testParseTableNew = [];



    headerTableRawHTML = headerTableRawHTML.split("\n");





    for (let obj of headerTableRawHTML) {
        testParseTableNew.push(obj.replace(/\t/g, ""));
    }





    testParseTableNew = testParseTableNew.filter(function (val, index) {


        return val !== '' && val !== ' ' && val !== 'Места:' && val !== 'Цена';

    });




    let findIndex = [];
    let resultArr = [];

    let objResultArr = [];

    for (let [ index, value ] of testParseTableNew.entries()) {
        if (value === "№Поезда:"){
            findIndex.push(index);
        }
    }


    for (let obj of findIndex) {
        resultArr.push(testParseTableNew.slice(obj+1, obj+18));
    }




    for (let valArr of resultArr) {

        let [numberTrain, pathTrain, timeIn, timeOut, timeInRoad, common, seat, placKart, kupe, easy, lux, commonPay, seatPay, placKartPay, kupePay, easyPay, luxPay] = valArr;

        objResultArr.push({

            numberTrain: numberTrain,
            pathTrain: pathTrain,
            timeIn: timeIn,
            timeOut: timeOut,
            timeInRoad: timeInRoad,

            common: common,
            seat: seat,
            placKart: placKart,
            kupe: kupe,
            easy: easy,
            lux: lux,
            commonPay: commonPay,
            seatPay: seatPay,
            placKartPay: placKartPay,
            kupePay: kupePay,
            easyPay: easyPay,
            luxPay: luxPay


        });
    }


    return objResultArr;

}


module.exports = {


    getListTickets: async (FROM_STATION, TO_STATION, DATE) => {




        try {




            let fromStation = await request("https://epay.railways.kz/ktz4/json4.jsp?term=" + querystring.escape(FROM_STATION));
            let toStation = await request("https://epay.railways.kz/ktz4/json4.jsp?term=" + querystring.escape(TO_STATION));

            let fromStationStr = JSON.parse(fromStation);
            let toStationStr = JSON.parse(toStation);

            let response = await request.post('https://epay.railways.kz/ktz4/proc', {form:{
                    pa:"express3",
                    sa:"GET_P62G60_EVENT",
                    STEP:1,
                    TIME:"0123",
                    FROM_STATION:fromStationStr[0].id,
                    TO_STATION:toStationStr[0].id,
                    DATE:DATE

                }});


            const $ = cheerio.load(response);


            let parseBodyTableTest = "";
            let arrResult = [];
            let resultStr = "";





            parseBodyTableTest = $('.schedule-item>table').text();








            arrResult = await generateObjForHeaderTable(parseBodyTableTest);


            for (const val of arrResult) {

                resultStr += `
Номер поезда: ${val.numberTrain}
${val.pathTrain}
${val.timeIn}
${val.timeOut}
${val.timeInRoad}
Места и стоимость:
${val.common}: ${val.commonPay}
${val.seat}: ${val.seatPay}
${val.placKart}: ${val.placKartPay}
${val.kupe}: ${val.kupePay}
${val.easy}: ${val.easyPay}
${val.lux}: ${val.luxPay}

`

            }






            return resultStr;



        } catch (err) {


            return "Сервис по поиску билетов, не доступен, попробуйте позже";

        }












    }











};