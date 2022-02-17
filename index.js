const fsp = require('fs/promises')
const TurndownService = require('turndown')
const turndownPluginGfm = require('./turndown-plugin-gfm.js')
const turndownPluginConfluenceToGfm = require('turndown-plugin-confluence-to-gfm')

const { gfm, tables, strikethrough } = turndownPluginGfm

const DEFAULTS = {
  headingStyle: 'atx',
  hr: '-',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '`',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  preformattedCode: 'false'
}

const readStdin = () => new Promise((resolve, reject) => {
  const {stdin} = process
  let buff = ''

  stdin.setEncoding('utf8')

  stdin.on('data', function (data) {
    buff += data
  })

  stdin.on('error', reject)

  stdin.on('end', function () {
    resolve(buff)
  })

  stdin.resume()
})


const main = async (opts) => {
  const { sourcePath, targetPath } = opts
  const turndownOpts = { ...DEFAULTS, ...opts?.turndown }
  const turndownService = new TurndownService(turndownOpts)

  turndownService.use(gfm)
  turndownService.use(tables)
  turndownService.use(strikethrough)
  turndownPluginConfluenceToGfm.confluenceGfm(turndownService)

  const html = sourcePath
    ? await fsp.readFile(sourcePath, 'utf8')
    : await readStdin()

  const markdown = turndownService.turndown(html)
  if (!!markdown) {
    if (targetPath) {
      await fsp.writeFile(targetPath, markdown, 'utf8')
      console.log(`  Saved at path\n    Absolute: ${targetPath}`)
    } else {
      console.log(markdown)
    }
  }
}

main.DEFAULTS = DEFAULTS

module.exports = main
