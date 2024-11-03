const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const TelegramBot = require('node-telegram-bot-api');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');
// Routes
const mountRoutes = require('./routes');
const token = '7733472718:AAEtJ8ob2MY2ICT7PXSoCgvPheA2UvgJB0Y';

const bot = new TelegramBot(token, { polling: true });

// Connect with db
dbConnection();

// express app
const app = express();

// Enable other domains to access your application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

app.get('/', () => {
  console.log('asdasdas');
  //res.send("asdasasdasd");
})

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || "مستخدم"; // الحصول على اسم المستخدم

  const welcomeMessage = `مرحبًا ${userName}، أهلاً بك في البوت الخاص بنا!
  الأوامر المتاحة:
  1. /tiktok - للترحيب بالمستخدم
  2. /facebook - لعرض قائمة الأوامر
  3. /whatsapp - لعرض معلومات عن البوت
  `;
  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/tiktok/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `https://www.tiktok.com/@alaa_taha_dev`;
  bot.sendMessage(chatId, welcomeMessage);
});
bot.onText(/\/facebook/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `https://www.facebook.com/alaa.taha.71271466`;
  bot.sendMessage(chatId, welcomeMessage);
});
bot.onText(/\/whatsapp/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `whatsapp://send?phone=+201111529018`;
  bot.sendMessage(chatId, welcomeMessage);
});
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
