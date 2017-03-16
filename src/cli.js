#!/usr/bin/env node

const meow = require('meow')
const commands = require('./commands')

const cli = meow(`
  Usage
    $ gear compile <source dir> -d <output dir>
    $ gear type-check <source dir>

  Options
    -d, --out-dir <output dir>    Set output directory.
    --flow <transformation>       Set babel plugin to use, like 'runtime' or
                                  'strip-types' (default).
    --help                        Print this help.
    -w, --watch                   Watch files, recompile on change.
`, {
  alias: {
    d: 'out-dir',
    w: 'watch'
  }
})

const [ commandName, ...args ] = cli.input
const command = commandName ? commands[ commandName.toLowerCase() ] : null

if (!commandName || cli.flags.help) {
  cli.showHelp()
} else if (command) {
  command(args, cli.flags, console)
} else {
  throw new Error(`Unknown command: ${commandName}`)
}
