const {getRepoList} = require('./http')
const ora = require('ora')
const inquirer = require('inquirer')


class Generator {
  constructor(name, targetDir) {
    this.name = name; //目录名称
    this.targetDir = targetDir; //创建位置
  }
  //   业务核心逻辑处理
  create() {}
}

module.exports = Generator