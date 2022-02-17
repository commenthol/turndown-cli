const assert = require('assert')
const fs = require('fs/promises')
const path = require('path')
const sh = require('shelljs')
const cli = require('../index.js')

describe('cli', function () {
  it('shall transform', async function () {
    const opts = {
      sourcePath: path.resolve(__dirname, './test.html'),
      targetPath: path.resolve(__dirname, './tmp.md')
    }

    await cli(opts)

    const exp = await fs.readFile(path.resolve(__dirname, './test.md'), 'utf8')
    const tmp = await fs.readFile(opts.targetPath, 'utf8')

    assert.strictEqual(tmp, exp)

    sh.rm(opts.targetPath)
  })
})
