/**
 * Created by simvolice on 20.07.2017 17:31
 */

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const execFile = util.promisify(require('child_process').execFile);


const callModule = require('./callModule');




module.exports = {

  returnResult: async (text) => {



    let tempArr = [];

    let resultForBot = '';

    await writeFile('inputForMyStem.txt', text, 'utf8');


    const { stdout, stderr } = await execFile('mystem.exe', ['-d', '--format', 'json', 'inputForMyStem.txt']);



    let parseData = JSON.parse(stdout);

    for (let obj of parseData) {

      for (let obj1 of obj.analysis) {
        tempArr.push(obj1.lex);
      }

    }


    console.log("\x1b[42m", tempArr);




    resultForBot = await callModule.sendArg(tempArr);



    return resultForBot;


  }




};