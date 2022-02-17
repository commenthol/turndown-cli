#!/usr/bin/env node

const path = require('path')
const turndown = require('../index.js')
const { version } = require('../package.json')

const OPTIONS = {
  headingStyle: ['atx', 'setext'],
  hr: ['-', '*', '_'],
  bulletListMarker: ['-', '\*', '+'],
  codeBlockStyle: ['fenced', 'indented'],
  fence: ['`', '~'],
  emDelimiter: ['_', '*'],
  strongDelimiter: ['**', '__'],
  linkStyle: ['inlined', 'referenced'],
  linkReferenceStyle: ['full', 'collapsed', 'shortcut'],
  preformattedCode: ['false', 'true']
}

const help = () => console.log(`
Usages:
  turndown (-h|-v)
  turndown <source> (<target>)
  turndown (<option>) <source> (<target>)

Parameters:
  source    HTML source filepath
  target    Markdown target filepath
  option    Any option from provided options

Options:
  -h --help       Show help contents
  -v --version    Show version information
  -@              Output to console
  -t --head       Heading style
                  ${OPTIONS.headingStyle}
  -r --hr         Horizontal rule
                  ${OPTIONS.hr}
  -b --bullet     Bullet list marker
                  ${OPTIONS.bulletListMarker}
  -c --code       Code block style
                  ${OPTIONS.codeBlockStyle}
  -f --fence      Fence style
                  ${OPTIONS.fence}
  -e --em         Em delimiter
                  ${OPTIONS.emDelimiter}
  -s --strong     Strong delimiter
                  ${OPTIONS.strongDelimiter}
  -l --link       Link style
                  ${OPTIONS.linkStyle}
  -u --linkref    Link reference style
                  ${OPTIONS.linkReferenceStyle}
  -p --pre        Preformatted code
                  ${OPTIONS.preformattedCode}

Note that the first choice is default for each options.

Examples:
  turndown -h
  turndown sample.html
  turndown sample.html sample.md
  turndown -t setext -r \- -c fenced -f \` -s \*\* sample.html
`)

function argv(args) {
  const argv = args || process.argv.slice(2)
  const cmd = {
    turndown: { ...turndown.DEFAULTS }
  }

  const setOpts = (key, val) => OPTIONS[key].includes(val) ? cmd.turndown[key] = val : undefined

  while (argv.length) {
    const arg = argv.shift()

    switch (arg) {
      case '-h':
      case '--help':
        help()
        process.exit(0)
      case '-v':
      case '--version':
        console.log(version)
        process.exit(0)
      case '-@':
        cmd._isConsole = true
        cmd.targetPath = undefined
        break
      case '-t':
      case '--head':
        setOpts('headingStyle', argv.shift())
        break
      case '-r':
      case '--hr':
        setOpts('hr', argv.shift())
        break
      case '-b':
      case '--bullet':
        setOpts('bulletListMarker', argv.shift())
        break
      case '-c':
      case '--code':
        setOpts('codeBlockStyle', argv.shift())
        break
      case '-f':
      case '--fence':
        setOpts('fence', argv.shift())
        break
      case '-e':
      case '--em':
        setOpts('emDelimiter', argv.shift())
        break
      case '-s':
      case '--strong':
        setOpts('strongDelimiter', argv.shift())
        break
      case '-l':
      case '--link':
        setOpts('linkStyle', argv.shift())
        break
      case '-u':
      case '--linkref':
        setOpts('linkReferenceStyle', argv.shift())
        break
      case '-p':
      case '--pre':
        setOpts('preformattedCode', argv.shift())
        break
      default:
        if (!cmd.sourcePath) {
          cmd.sourcePath = path.resolve(process.cwd(), arg)
          if (!cmd._isConsole) {
            const targetFilename = path.basename(cmd.sourcePath, path.extname(cmd.sourcePath)) + '.md';
            const defaultTargetPath = path.join(path.dirname(cmd.sourcePath), targetFilename);
            cmd.targetPath = defaultTargetPath
          }
        } else if (!cmd._isConsole) {
          cmd.targetPath = arg
        }
        break
    }
  }

  return cmd
}

const main = async () => {
  const opts = argv()
  // console.log(opts)
  // return
  await turndown(opts)
}

main().catch(err => {
  console.error(err.message)
})
