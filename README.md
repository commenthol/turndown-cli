# turndown-cli

A [turndown]() CLI with gfm plugin enabled. 

```
$ bin/turndown.js --help

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
                  atx,setext
  -r --hr         Horizontal rule
                  -,*,_
  -b --bullet     Bullet list marker
                  -,*,+
  -c --code       Code block style
                  fenced,indented
  -f --fence      Fence style
                  `,~
  -e --em         Em delimiter
                  _,*
  -s --strong     Strong delimiter
                  **,__
  -l --link       Link style
                  inlined,referenced
  -u --linkref    Link reference style
                  full,collapsed,shortcut
  -p --pre        Preformatted code
                  false,true

Note that the first choice is default for each options.

Examples:
  turndown -h
  turndown sample.html
  turndown sample.html sample.md
  turndown -t setext -r - -c fenced -f ` -s ** sample.html
```

The [turndown-plugin-gfm](https://github.com/laurent22/joplin-turndown-plugin-gfm.git) is a modified version of an archived project. The modified sources are part of this project and can be found under `packages`.

# License

[MIT](./LICENSE) licensed
