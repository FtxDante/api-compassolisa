const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;
const data = new Date();

const hour = data.getHours();
const min = data.getMinutes() <= 9 ? `0${data.getMinutes()}` : data.getMinutes();

const strHour = `${hour}:${min}`;

app.listen(port, () => {
  console.table({ startedAt: strHour, status: `🟢`, port, local: process.env.LOCAL });
});
