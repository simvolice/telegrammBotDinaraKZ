/**
 * Created by simvolice on 21.12.2017 20:31
 */


const request = require('request-promise-native');
const querystring = require('querystring');
const cheerio = require('cheerio');


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


            let parseHeaderTable = "";
            let parseBodyTable = "";
            let testParseTableNew = [];


            parseHeaderTable = $('#jsSchedulesList>article>table>thead>tr').text();


            parseBodyTable = $('#jsSchedulesList>article>table>tbody').text();






            parseBodyTable = parseBodyTable.split("\n");
            parseHeaderTable = parseHeaderTable.split("\n");





            for (let obj of parseHeaderTable) {
                testParseTableNew.push(obj.replace(/\t/g, ""));
            }


            for (let [index, value] of testParseTableNew.entries()) {
                if(value === ''){
                    testParseTableNew.splice(index, 1);
                }
            }

            let findIndex = [];
            let resultArr = [];

            let objResultArr = [];

            for (let [ index, value ] of testParseTableNew.entries()) {
                if (value === "№Поезда:"){
                    findIndex.push(index);
                }
            }


            for (let obj of findIndex) {
                resultArr.push(testParseTableNew.slice(obj+1, obj+6));
            }




            for (let valArr of resultArr) {

                let [numberTrain, pathTrain, timeIn, timeOut, timeInRoad] = valArr;

                objResultArr.push({

                    numberTrain: numberTrain,
                    pathTrain: pathTrain,
                    timeIn: timeIn,
                    timeOut: timeOut,
                    timeInRoad: timeInRoad

                });
            }





            return "Пошел поиск билетов";



        } catch (err) {


            return "Сервис по поиску билетов, не доступен, попробуйте позже";

        }












    }











};