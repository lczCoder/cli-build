#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");

program
  .command("create <app-name>")
  .description("Create a new project")
  .option("-f --force", "overwrite target directory if it exist")
  .action((name, options) => {
    require("./create")(name, options);
  });

program
  .version(`v${require("../package.json").version}`)
  .usage("<command> [options]");

program.on("--help", () => {
 // 使用 figlet 绘制 Logo
 console.log('\r\n' + figlet.textSync('cli-build', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 100,
    whitespaceBreak: true
  }));
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
});

program.parse(process.argv);
