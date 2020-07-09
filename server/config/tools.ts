const bcrypt = require("bcryptjs");

module.exports = {
  // 加密
  enbcrypt(password) {
    //生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    let hash = bcrypt.hashSync(password, salt);

    return hash;
  },
  // 解密
  debcrypt(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
};
