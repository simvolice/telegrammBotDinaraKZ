/**
 * Created by simvolice on 19.09.2017 15:40
 */


const { MongoClient }= require('mongodb');
const Logger = require('mongodb').Logger;
Logger.setLevel('debug');

let db = null;
let client = null;

class ConnectDB {

    constructor(url, dbName){

        this.url = url;
        this.dbName = dbName;

    }


    async connect(){

        try {


           client = await MongoClient.connect(this.url);
           db = client.db(this.dbName);


        } catch (err) {

            client = err;


        }



    }

    static getDBPool(){

        return db;

    }



}


module.exports = ConnectDB;