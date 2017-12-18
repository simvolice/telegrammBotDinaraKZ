/**
 * Created by simvolice on 19.09.2017 15:40
 */


const { MongoClient }= require('mongodb');
const Logger = require('mongodb').Logger;
Logger.setLevel('debug');

let dbPool = null;

class ConnectDB {

    constructor(url){

        this.url = url;

    }


    async connect(){

        try {


            dbPool = await MongoClient.connect(this.url);


        } catch (err) {

            dbPool = err;


        }



    }

    static getDBPool(){

        return dbPool;

    }



}


module.exports = ConnectDB;