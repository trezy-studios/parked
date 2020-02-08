# Parked

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
