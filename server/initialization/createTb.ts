const modelArr = [
  "BlogModel",
  "CommentModel",
  "FollowModel",
  "ReplyModel",
  "SortModel",
  "UserModel",
];

async function initTable() {
  //封装
  return await new Promise((resolve, reject) => {
    try {
      Promise.all(
        modelArr.map((model) => {
          require(`../models/${model}.ts`).sync({ force: false });
        })
      );
      resolve(); //表存在
    } catch (error) {
      console.log(error); //不存在或其他错误
      reject(error);
    }
  });
}

(async () => {
  // await 必须在 async 函数中使用，但不一定非要使用IIFE
  try {
    console.log("Initialization: data table is being created...\r\n");
    await initTable(); // 调用
    //TODO: 表存在执行后续业务逻辑
  } catch (error) {
    console.log("error", error);
    //不存在或其他错误
  }
})();
