require('dotenv').config();


const TelegramBot = require('node-telegram-bot-api');
const myStem = require('./myStem');
const ConnectDB = require('./ConnectDB');
let connectDB = new ConnectDB(process.env.MONGO_URL_DEV);


async function initDB() {

   await connectDB.connect();
}

initDB();


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg)  => {
    const chatId = msg.chat.id;

    if(msg.text === "/start"){
        bot.sendMessage(chatId, '1) Чтобы узнать погоду, просто напечатайте, Например: "Какая погода в Астане, или в другом городе Казахстана"' +
            '\n2) Чтобы узнать наличие билетов на поезд по Казахстану, просто напечатайте, Например: "Билет Астана-Алматы на 14.12.2017"');


    } else {

        let result = await myStem.returnResult(msg.text);



        bot.sendMessage(chatId, result);


    }



});