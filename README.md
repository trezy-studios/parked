# Parked
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Parked is a parser of [Markdown][markdown]





## Basic Usage

Install the core and parser packages:

```
npm install @parked/core @parked/parser-markdown-to-html
```

Import `Parked` and instantiate it with the parser:

```js
import { Parked } from '@parked/core'
import { MarkdownToHTMLParser } from '@parked/parser-markdown-to-html'

const parked = new Parked({
  parser: MarkdownToHTMLParser,
})

const string = 'This is my string! Test: **bold** *italic* ~~strikethrough~~'

parked.parse(string)
// should return:
// 'This is my string! Test: <strong>bold</strong> <em>italic</em> <s>strikethrough</s>'
```





## Support

| Syntax name | Syntax type | Supported
| - | - | - |
| Annotated Link | `[linked text][example annotation]` | No |
| Blockquote | `> blockquote` | No |
| Bold | `**bold text**` | Yes |
| Code Block | \`\`\`code block\`\`\` | No |
| Headers | `# header` | No |
| Horizontal Rule | `---` | No |
| Image | `![alt text](https://example.com/image.png "title")` | No |
| Inline Code | \`inline code\` | No |
| Italic | `*italicized text*` | Yes |
| Ordered Lists | `1. list item` | No |
| Link | `[linked text](https://example.com)` | No |
| Strikethrough | `~~stricken text~~` | Yes |
| Unordered Lists | `1. list item` | No |





[markdown]: https://daringfireball.net/projects/markdown/ "Markdown at Daring Fireball"

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://trezy.com"><img src="https://avatars2.githubusercontent.com/u/442980?v=4" width="100px;" alt=""/><br /><sub><b>Trezy</b></sub></a><br /><a href="https://github.com/trezy-studios/parked/commits?author=trezy" title="Code">💻</a> <a href="https://github.com/trezy-studios/parked/commits?author=trezy" title="Documentation">📖</a> <a href="#design-trezy" title="Design">🎨</a> <a href="#example-trezy" title="Examples">💡</a> <a href="#ideas-trezy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-trezy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/trezy-studios/parked/commits?author=trezy" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!