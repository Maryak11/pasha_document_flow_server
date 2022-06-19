const Sequelize = require("sequelize"); //подключаем сиквалайз БИБИЛОТЕКА

// Экзепмляр класса сиквалайз, создаю подключение своей бд
const db = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  //До создания таблицы вызовется хук, Все таблицы с окончанием s (мн число)
  hooks: {
    beforeDefine: function (columns, model) {
      model.tableName = model.name.plural;
    },
  },
  timezone: process.env.DB_TIMEZONE, //москвоское время в БД
  logging: false,
});

module.exports = db; // в любом месте приложения использования инстанса подлюченной нашей БД
