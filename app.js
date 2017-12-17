require('dotenv').config();


const TelegramBot = require('node-telegram-bot-api');


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if(msg.text === "/start"){
        bot.sendMessage(chatId, '1) Чтобы узнать погоду, просто напечатайте, Например: "Какая погода в Астане, или в другом городе Казахстана"' +
            '\n2) Чтобы узнать наличие билетов на поезд по Казахстану, просто напечатайте, Например: "Билет Астана-Алматы на 14.12.2017"');


    } else {


        bot.sendMessage(chatId, 'Тестовый ответ');


    }



});