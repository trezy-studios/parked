// Module imports
import { AllHtmlEntities } from 'html-entities'
// import Prism from 'prismjs'
// import uuid from 'uuid/v4'





// Local imports
// import Parser from './Parser'
import { parsers } from './parsers'





const codeBlocks = {}

const entities = new AllHtmlEntities

// const parsers = {
//   annotations: {
//     regex: /^\[(.+?)\]:(.+)$/gmu,
//     replacer: (options, match, name, content) => {
//       const {
//         annotations,
//         preserveFormattingMarks,
//       } = options

//       annotations[name.trim()] = content.trim()

//       if (preserveFormattingMarks) {
//         return match
//       }

//       return ''
//     },
//   },

//   'bare link': {
//     regex: /((?:https?|ftp):\/\/(?:[\w-]+\.)?(?:[\w-])+\.(?:\w)+\/?[\w?.=&#/+-]+)/gu,
//     replacer: (options, match, link, index, original) => {
//       const hrefString = 'href="'
//       const isParsed = original.substring(index - hrefString.length, index) === hrefString
//       const isText = (original[index - 1] === '[') && (original[index + match.length] === ']')

//       if (isParsed || isText) {
//         return match
//       }

//       return `<a href="${link}">${link}</a>`
//     },
//   },

//   blockquote: {
//     regex: /((?:>|&gt;) .+(?:\n(?:>|&gt;) .+)*)/gmu,
//     replacer: (options, match, content) => {
//       const { preserveFormattingMarks } = options
//       let renderedBlockquote = content.replace(/\n/gmu, '<br>')

//       if (!preserveFormattingMarks) {
//         renderedBlockquote = renderedBlockquote.replace(/^> /gmu, '')
//       }

//       return `<blockquote>${renderedBlockquote}</blockquote>`
//     },
//   },

//   bold: {
//     regex: /\*\*(.+?)\*\*/gu,
//     replacer: (options, match, content) => {
//       const { preserveFormattingMarks } = options

//       if (/^\*\*\*/gu.test(match) || /\*\*\*$/gu.test(match)) {
//         return match
//       }

//       if (preserveFormattingMarks) {
//         return `<strong>**${content}**</strong>`
//       }

//       return `<strong>${content}</strong>`
//     },
//   },

//   'code block': {
//     regex: /```(\w+)?([\s\S]*?)```/gmu,
//     replacer: (options, match, language, code) => {
//       const { preserveFormattingMarks } = options
//       let renderedCode = entities.decode(code.trim())

//       if (language) {
//         renderedCode = Prism.highlight(renderedCode, Prism.languages[language], language)
//       } else {
//         renderedCode = Prism.highlight(renderedCode, Prism.languages.markup, 'markup')
//       }

//       if (preserveFormattingMarks) {
//         renderedCode = `\`\`\`${language}\n${renderedCode}\n\`\`\``
//       }

//       const id = uuid()

//       codeBlocks[id] = `<pre class="language-${language}"><code class="language-${language}">${renderedCode}</code></pre>`

//       return `[CODE]${id}[/CODE]\n\n`
//     },
//   },

//   headers: {
//     regex: /^(#+) (.+?)$/gmu,
//     replacer: (options, match, octothorpes, content) => {
//       const { preserveFormattingMarks } = options
//       const depth = octothorpes.length + 1

//       if (preserveFormattingMarks) {
//         return `<h${depth}>${octothorpes} ${content}</h${depth}>`
//       }

//       return `<h${depth}>${content}</h${depth}>`
//     },
//   },

//   'inline code': {
//     regex: /`(.+?)`/gu,
//     replacer: (options, match, content) => {
//       const { preserveFormattingMarks } = options

//       if (preserveFormattingMarks) {
//         return `<code>\`${content}\`</code>`
//       }

//       return `<code>${content}</code>`
//     },
//   },

//   italic: {
//     regex: /\*(.+?)\*/gu,
//     replacer: (options, match, content) => {
//       const { preserveFormattingMarks } = options

//       if (/^\*\*/gu.test(match) || /\*\*$/gu.test(match)) {
//         return match
//       }

//       if (preserveFormattingMarks) {
//         return `<em>*${content}*</em>`
//       }

//       return `<em>${content}</em>`
//     },
//   },

//   'italic and bold': {
//     regex: /\*\*\*(.+?)\*\*\*/gu,
//     replacer: (options, match, content) => {
//       const { preserveFormattingMarks } = options

//       if (preserveFormattingMarks) {
//         return `<strong><em>***${content}***</em></strong>`
//       }

//       return `<strong><em>${content}</em></strong>`
//     },
//   },

//   'line break': {
//     regex: /\n/gu,
//     replacer: '<br>',
//   },

//   link: {
//     regex: /\[(.+?)\](\[.+?\]|\(.+?\))/gu,
//     replacer: (options, match, text, link) => {
//       const {
//         annotations,
//         preserveFormattingMarks,
//       } = options

//       if (link[0] === '(') {
//         if (preserveFormattingMarks) {
//           return `[${text}](<a href="${link}">${link}</a>)`
//         }

//         return `<a href="${link}">${text}</a>`
//       }

//       const annotationName = link.replace(/^\[(.+?)\]$/u, '$1')
//       const annotation = annotations[annotationName]

//       if (!annotation) {
//         return match
//       }

//       if (preserveFormattingMarks) {
//         return `[${text}][<a href="${annotation}">${annotationName}</a>]`
//       }

//       return `<a href="${annotation}">${text}</a>`
//     },
//   },

//   'ordered list': {
//     regex: /(\s*\d\. .+(?:\n\s*\d\. .+)*)/gmu,
//     replacer: (options, match, contents) => {
//       const { preserveFormattingMarks } = options
//       const itemReplacer = (xMatch, digit, content) => `<li data-marker="${digit}">${content.trim()}</li>`
//       const itemMapper = listItem => listItem.replace(/\s*(\d\. )(.*)/u, itemReplacer)
//       const listItems = contents
//         .trim()
//         .replace(/^\n+/gmu, '\n')
//         .split('\n')
//         .map(itemMapper)
//         .join('')

//       if (preserveFormattingMarks) {
//         return `<ol class="custom-markers">${listItems}</ol>`
//       }

//       return `<ol class="numbered">${listItems}</ol>`
//     },
//   },

//   paragraph: {
//     regex: /(.*(?:\n.*)*?)\n\n+/gmu,
//     replacer: (options, match, content) => {
//       if (!content) {
//         return ''
//       }

//       return `<p>${content}</p>`
//     },
//   },

//   strikethrough: {
//     regex: /~~(.+?)~~/gu,
//     replacer: (options, match, content) => {
//       const { preserveFormattingMarks } = options

//       if (preserveFormattingMarks) {
//         return `<s>~~${content}~~</s>`
//       }

//       return `<s>${content}</s>`
//     },
//   },

//   'unordered list': {
//     regex: /^(\s*\* .+(?:\n+\s\* .+)*)/gu,
//     replacer: (options, match, contents) => {
//       const { preserveFormattingMarks } = options
//       let listItems = contents
//         .trim()
//         .replace(/^\n+/gmu, '\n')

//       if (!preserveFormattingMarks) {
//         listItems = listItems.replace(/^\s*\* /gmu, '')
//       }

//       listItems = listItems
//         .split('\n')
//         .map(listItem => `<li>${listItem.trim()}</li>`)
//         .join('')

//       return `<ul class="bulleted">${listItems}</ul>`
//     },
//   },
// }





const defaultOptions = {
  allowedParsers: [
    // 'annotations',
    // 'blockquote',
    // 'link',
    // 'headers',
    // 'code block',
    // 'ordered list',
    // 'unordered list',
    // 'inline code',
    // 'bare link',
    // 'italic and bold',
    'bold',
    'italic',
    'strikethrough',
    'paragraph',
    'line-break',
  ],
  annotations: {},
  preserveFormattingMarks: false,
}

const renderMarkdownToHTML = (string, options = {}) => {
  const allOptions = {
    ...defaultOptions,
    ...options,
  }
  const { allowedParsers } = allOptions
  let renderedString = entities.encode(string)

  if (allowedParsers.includes('code block')) {
    const {
      regex,
      markdownReplacer,
    } = parsers['code block']

    renderedString = renderedString.replace(regex, (...args) => markdownReplacer(allOptions, ...args))
  }

  const parsersToUse = allowedParsers.reduce((accumulator, parserName) => {
    const parser = parsers[parserName]

    if (parserName === 'code block') {
      return accumulator
    }

    if (!parser) {
      console.error(`No parser exists for "${parserName}"`)
      return accumulator
    }

    accumulator.push(parser)

    return accumulator
  }, [])

  parsersToUse.forEach(parser => {
    const { regex } = parser
    let replacer = parser.markdownReplacer

    if (typeof replacer === 'function') {
      replacer = (...args) => parser.markdownReplacer(allOptions, ...args)
    }

    renderedString = renderedString.replace(regex, replacer)
  })

  if (allowedParsers.includes('code block')) {
    renderedString = renderedString.replace(/\[CODE\]([\d\w-]*?)\[\/CODE\]/gmu, (match, id) => codeBlocks[id])
  }

  return renderedString
}





export default renderMarkdownToHTML
