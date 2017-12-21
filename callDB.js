/**
 * Created by simvolice on 18.12.2017 17:37
 */


const ConnectDB = require("./ConnectDB");


module.exports = {


    getCoordinate: async (itemForFind) => {


        try {


            let dbPool = await ConnectDB.getDBPool();



            let col = dbPool.collection("cities");

            let result = await col.aggregate([

                {$match: {}},


                {
                    $project: {


                        _id: 0,
                        coordinate: 1,

                        coordinateFind : {
                            $in: [ itemForFind, "$synonyms" ]
                        }
                    }
                },

                {
                    $match: {coordinateFind: true}
                }







            ]).toArray();

            return result;







        } catch (err){


            return err;


        }









    }







};


