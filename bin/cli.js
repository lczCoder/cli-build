#! /usr/bin/env node
const program = require('commander')

program
.command('create <app-name>')
.description('Create a new project')
.option('-f --force','overwrite target directory if it exist')
.action((name,options) => {
    console.log('name',name,'option',options)
})

program
.version(`v${require('../package.json').version}`)
.usage('<command> [options]')

program.parse(process.argv)