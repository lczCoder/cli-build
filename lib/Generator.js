const { getRepoList } = require("./http");
const ora = require("ora");
const inquirer = require("inquirer");

// 添加加载动画效果
async function waitLoading(fn, message, ...args) {
  // ora 初始化
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail("fail:网络请求错误~~~");
  }
}

class Generator {
  constructor(name, targetDir) {
    this.name = name; //目录名称
    this.targetDir = targetDir; //创建位置
  }
  //   业务核心逻辑处理
  create() {}
}

module.exports = Generator;
