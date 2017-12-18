/**
 * Created by simvolice on 18.12.2017 17:37
 */


const ConnectDB = require("./ConnectDB");


module.exports = {


    getCoordinate: async (tempArr) => {


        try {


            let dbPool = await ConnectDB.getDBPool();

            console.log("\x1b[42m", dbPool);

            let col = dbPool.collection("cities");

            let result = await col.find({}).toArray();

            return result;







        } catch (err){


            return err;


        }









    }







};


