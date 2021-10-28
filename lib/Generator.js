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
  async create() {
    //  获取用户选择的模板名称
    const repo = await this.getRepo();
    console.log('用户选择了,repos ='+repo)
  }

  async getRepo() {
    const repoList = await waitLoading(getRepoList, "模板获取中~");
    if (!repoList) return;
    // 过滤需要的模板名称
    const repos = repoList.map(item=> item.name)
    // 让用户选择下载的模板
    const {repo} = await inquirer.prompt({
        name:'repo',
        type:'list',
        choices:repos,
        message:'请选择需要下载的模板来创建项目'
    })
    return repo
  }
}

module.exports = Generator;
