const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

// START COMMAND
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Welcome to 3M Service 📊

We give high accuracy calls...

FOR EQUITY AND COMMODITY

If you find us good & safe then only work with us

Drop your WhatsApp number for free trial 👇`,
    {
      reply_markup: {
        keyboard: [[{ text: "📱 Share WhatsApp Number", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    }
  );
});

// CAPTURE CONTACT
bot.on('contact', async (msg) => {
  const name = msg.from.first_name || "";
  const phone = msg.contact.phone_number;

  try {
    await axios.post(WEB_APP_URL, {
      name: name,
      phone: phone
    });

    bot.sendMessage(msg.chat.id, "Thank you! ✅ Our team will contact you soon.");
  } catch (error) {
    bot.sendMessage(msg.chat.id, "Something went wrong. Please try again.");
  }
});
