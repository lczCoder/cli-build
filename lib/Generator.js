const { getRepoList, getTagList } = require("./http");
const ora = require("ora");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const downloadGitRepo = require('download-git-repo')
const util = require("util");
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
    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  //   业务核心逻辑处理
  async create() {
    //  获取用户选择的模板名称
    const repo = await this.getRepo();
    const tag = await this.getTag(repo)
    console.log(`用户选择了${repo}模板,${tag}版本`);
    await this.download(repo, tag)
    // 4）模板使用提示
    console.log(`\r\n下载模板成功！成功创建一个名为 ${chalk.cyan(this.name)} 的项目`)
    console.log(`\r\n 1、 cd ${chalk.green(this.name)}`)
    console.log('\r\n 2、 npm install')
    console.log('\r\n 3、 npm run dev\r\n')
    console.log('\r\n' + figlet.textSync('OK', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
      }));
  }

  async getRepo() {
    const repoList = await waitLoading(getRepoList, "模板获取中~");
    if (!repoList) return;
    // 过滤需要的模板名称
    const repos = repoList.map((item) => item.name);
    // 让用户选择下载的模板
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "请选择需要下载的模板来创建项目",
    });
    return repo;
  }

  async getTag(repo) {
    // 1）基于 repo 结果，远程拉取对应的 tag 列表
    const tags = await waitLoading(getTagList, "waiting fetch tag", repo);
    if (!tags) return;

    // 过滤我们需要的 tag 名称
    const tagsList = tags.map((item) => item.name);

    // 2）用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tagsList,
      message: "请选择一个版本来创建项目",
    });
    return tag;
  }

  async download(repo, tag){
    // 1）拼接下载地址
    const requestUrl = `zhurong-cli/${repo}${tag?'#'+tag:''}`;
    // 2）调用下载方法
    await waitLoading(
      this.downloadGitRepo, // 远程下载方法
      '下载模板中,请耐心等待~', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }

}

module.exports = Generator;
