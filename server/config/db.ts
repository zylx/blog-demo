const { Sequelize, Op, DataTypes } = require("sequelize");
const dataBase = require("./database.ts");

const { dbName, host, port, user, password } = dataBase;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  //默认输出执行sql语句
  logging: console.log,
  define: {
    //默认创建表有 createAt, updateAt
    timestamps: true,
    //可以给表设置别名
    freezeTableName: true,
    // 字段以下划线（_）来分割（默认是驼峰命名风格）
    underscored: false,
  },
  timezone: "+08:00", //东八时区
});

// 使用authenticate()函数测试连接是否正常
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database "${dbName}" is connected...`);
  })
  .catch((err) => {
    console.error("connect failed:" + err);
  });

module.exports = {
  sequelize,
  Op,
  DataTypes,
};
