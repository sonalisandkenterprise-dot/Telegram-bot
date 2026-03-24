const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

// ----------------------
// /start command
// ----------------------
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

// ----------------------
// Contact sharing
// ----------------------
bot.on('contact', async (msg) => {
  const name = msg.from.first_name || "";
  const phone = msg.contact.phone_number;

  try {
    const response = await axios.post(WEB_APP_URL, {
      name: name,
      phone: phone
    });

    if (response.data.result === "success") {
      bot.sendMessage(msg.chat.id, "Thank you! ✅ Our team will contact you soon.");
    } else {
      bot.sendMessage(msg.chat.id, "Oops! Something went wrong.");
    }
  } catch (error) {
    bot.sendMessage(msg.chat.id, "Oops! Something went wrong.");
  }
});

// ----------------------
// Manual text messages
// ----------------------
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // Ignore messages that are contact sharing (already handled)
  if (msg.contact) return;

  const name = msg.from.first_name || "";
  const text = msg.text || "";

  try {
    const response = await axios.post(WEB_APP_URL, {
      name: name,
      message: text
    });

    if (response.data.result === "success") {
      bot.sendMessage(chatId, "Thanks! ✅ We received your message.");
    } else {
      bot.sendMessage(chatId, "Oops! Something went wrong.");
    }
  } catch (error) {
    bot.sendMessage(chatId, "Oops! Something went wrong.");
  }
});
