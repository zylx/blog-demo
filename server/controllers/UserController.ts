const UserService = require("../services/UserService.ts");
const tools = require("../config/tools.ts");
const jsonwebtoken = require("jsonwebtoken"); // 用于签发token

module.exports = {
  // 用户注册业务逻辑
  doRegister: async (ctx, next) => {
    await next();
    let request = ctx.request.body,
      response;
    let username = request.username,
      email = request.email,
      password = request.password;
    // 1 判断用户是否存在(不存在返回空数组)
    let retArr = await UserService.findUser(email);
    if (retArr.length) {
      response = { success: false, msg: "账号已存在!" };
    } else {
      let retData = await UserService.insertUser(
        username,
        tools.enbcrypt(password),
        email
      );
      response = { success: true, msg: retData };
    }
    ctx.response.body = response;
  },
  // 用户登录业务逻辑
  doLogin: async (ctx, next) => {
    await next();
    let request = ctx.request.body, response;
    let password = request.password, email = request.email;
    // 判断账号是否注册
    let retArr = await UserService.findUser(email);
    if (retArr.length) {
      let user = retArr[0].dataValues;
      // 再判断密码是否一致
      if (tools.debcrypt(password, user.password)) {
        let token = jsonwebtoken.sign(
          {
            email: email,
            password: password
          },
          "secret",
          {
            expiresIn: "1h"
          }
        );
		// user.password = password;
		delete user.password;
        response = {
          success: true,
          msg: "登录成功!",
          token: token,
          user: user
        };
      } else {
        response = { success: false, msg: "密码错误!" };
      }
    } else {
      response = { success: false, msg: "账号不存在!" };
    }
    ctx.response.body = response;
  },
  // 修改用户信息
  modifyUser: async (ctx, next) => {
    await next();
    let request = ctx.request.body,
      response;
    if (request.avatar) {
      let email = request.email,
        avatar = request.avatar;
      response = await UserService.updateAvatar(email, avatar);
    }
    if (request.username) {
      let email = request.email,
        username = request.username;
      response = await UserService.updateUsername(email, username);
    }
    ctx.response.body = response;
  },
  // 获取用户信息
  getUser: async (ctx, next) => {
    await next();
    let email = ctx.params.email;
    let userInfo = await UserService.findUser(email);
    ctx.response.body = userInfo;
  }
};
