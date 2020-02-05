# Parked

Parked is a parser of [Markdown][markdown]

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
| Italic | `*italicized text*` | No |
| Ordered Lists | `1. list item` | No |
| Link | `[linked text](https://example.com)` | No |
| Strikethrough | `~~stricken text~~` | No |
| Unordered Lists | `1. list item` | No |

## Usage

Install the package:

```
npm install @parked/core
```

Import and use the rendering function in your code:

```js
import { markdownToHTML } from '@parked/core'

const string = 'This is my string! The word **bold** should be **bold**!'

markdownToHTML(string) // returns 'This is my string! The word <strong>bold</strong> should be <strong>bold</strong>!'
```

[markdown]: https://daringfireball.net/projects/markdown/ "Markdown at Daring Fireball"
