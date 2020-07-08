const testDb = require("./config/db.ts");

const Bar = testDb.sequelize.define("bar", {
  id: {
    type: testDb.DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // 角色名字
  name: {
    type: testDb.DataTypes.STRING(100),
    field: "name",
    allowNull: false,
  },
  // createdAt: {
  //     type: testDb.DataTypes.DATE,
  //     field: 'createdAt',
  //     defaultValue: testDb.sequelize.NOW // 设置时间默认值
  // },
  // updatedAt: {
  //     type: testDb.DataTypes.DATE,
  //     field: 'updatedAt',
  //     defaultValue: testDb.sequelize.NOW // 设置时间默认值
  // }
});

const Bar1 = testDb.sequelize.define("bar1", {
  id: {
    type: testDb.DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // 角色名字
  name: {
    type: testDb.DataTypes.STRING(100),
    field: "name",
    allowNull: false,
    comment: "这是一个包含注释的列名",
  },
});

const testUser = testDb.sequelize.define(
  "testUser",
  {
    id: {
      type: testDb.DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // 角色名字
    name: {
      type: testDb.DataTypes.STRING(100),
      allowNull: false,
      field: "name",
    },
    // 角色权限
    limits: {
      type: testDb.DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "limits",
      defaultValue: 0,
    },
    // 这可以创建一个外键:
    // bar_id: {
    //   type: testDb.sequelize.INTEGER,
    //   references: {
    //     // 这是引用另一个模型
    //     model: Bar,
    //     // 这是引用模型的列名称
    //     key: "id",
    //     // 这声明什么时候检查外键约束. 仅限PostgreSQL.
    //     deferrable: testDb.sequelize.Deferrable.INITIALLY_IMMEDIATE,
    //   },
    // },
  },
  {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 冻结表名，则表的名称和 model 相同，否则会自动加上's'变成复数形式: testUser => testUsers
    // tableName: 'testUser_db', // 或者自定义表名
  }
);

// testDb.sequelize.sync();
Bar.sync({ force: false });
Bar1.sync({ force: false });
testUser.sync({ force: false });

// const res1 = testUser.create({
//   name: "hf",
//   limits: 1
// });
// console.log("res1", res1);
// const res2 = Bar.update({
//   name: "Vue",
// }, {
//     where: {
//         id: 3
//     }
// });
// console.log("res2", res2);

testUser.belongsTo(Bar, { foreignKey: "id", targetKey: "id", as: "b" });

testUser
  .findAll({
    attributes: [
      "id",
      [testDb.sequelize.col("b.name"), "barName"],
      ["name", "testUserName"],
      "limits",
    ],
    include: [
      {
        model: Bar,
        as: "b",
        attributes: ["name"],
      },
    ],
    raw: true,
  })
  .then((result) => {
    console.log("result", JSON.stringify(result));
  })
  .catch((err) => {
    console.log("err", err);
  });
