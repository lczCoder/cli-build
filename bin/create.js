// lib/create.js
const path = require("path");
const fs = require("fs-extra");
const inquire = require("inquirer");
module.exports = async (name, option) => {
  // 当前命令行所在目录
  const cwd = process.cwd();
  // 模板创建目录地址
  const targetDir = path.join(cwd, name);
  // 判断目录是否存在
  if (fs.existsSync(targetDir)) {
    if (option.force) {
      await fs.remove(targetDir);
    } else {
      // TODO: 询问用户是否继续执行该操作
      let { action } = await inquire.prompt([
        {
          name: "action",
          type: "list",
          message: "目标路径已有文件,是否选择覆盖",
          choices: [
            { name: "Ok", value: "true" },
            { name: "cancel", value: "fasle" },
          ],
        },
      ]);
      if (!action) {
        return;
      }else if(action === 'true'){
        console.log("覆盖文件~")
        await fs.remove(targetDir)
      }
    }
  }
};
