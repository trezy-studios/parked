// Module imports
import { AllHtmlEntities } from 'html-entities'





const entities = new AllHtmlEntities

const parsers = {
  blockquote: {
    regex: /<blockquote.*?>(.*?)<\/blockquote>/gu,
    replacer: ({ includesFormattingMarks }, match, content) => {
      const renderedBlockquote = content.replace(/<br>/gmu, '\n')

      if (includesFormattingMarks) {
        return renderedBlockquote
      }

      return `> ${renderedBlockquote.replace(/\n/gmu, '\n> ')}`
    },
  },

  'code block': {
    regex: /<pre(.*?)>([\s\S]*?)<\/pre>/gmu,
    replacer: (match, attributes, content) => {
      const language = attributes.replace(/^.*?class=".*?language-(\w+).*?".*?$/iu, '$1') || ''

      return `\`\`\`${language}\n${content.replace(/<.*?>/gmu, '')}\n\`\`\``
    },
  },

  'ordered list': {
    regex: /<ol.*?>(.*?)<\/ol>/gmu,
    replacer: (match, contents) => `${contents.replace(/<li.*?>(.*?)<\/li>/gmu, '1. $1\n')}\n`,
  },

  'unordered list': {
    regex: /<ul.*?>(.*?)<\/ul>/gmu,
    replacer: (match, contents) => `${contents.replace(/<li.*?>(.*?)<\/li>/gmu, '* $1\n')}\n`,
  },

  paragraph: {
    regex: /<p>(.*?)<\/p>/gmu,
    replacer: (match, content) => {
      if (!content) {
        return ''
      }

      return `${content}\n\n`
    },
  },

  'line break': {
    regex: /<br>/gu,
    replacer: '\n',
  },

  'inline code': {
    regex: /<code>(.*?)<\/code>/gu,
    replacer: '`$1`',
  },

  // link: {
  //   regex: /((https?|ftp):\/\/([\w-]+\.)?([\w-])+\.(\w)+\/?[\w?.=&#/+-]+)/gu,
  //   replacer: '<a href="$1">$1</a>',
  // },

  bold: {
    regex: /<strong.*?>(.*?)<\/strong>/gu,
    replacer: ({ includesFormattingMarks }, match, content) => {
      if (includesFormattingMarks) {
        return content
      }

      return `**${content}**`
    },
  },

  italic: {
    regex: /<em.*?>(.*?)<\/em>/gu,
    replacer: ({ includesFormattingMarks }, match, content) => {
      if (includesFormattingMarks) {
        return content
      }

      return `*${content}*`
    },
  },

  strikethrough: {
    regex: /<s.*?>(.*?)<\/s>/gu,
    replacer: '~~$1~~',
  },
}





const defaultOptions = {
  allowedParsers: [
    // 'code block',
    'blockquote',
    // 'ordered list',
    // 'unordered list',
    // 'paragraph',
    // 'line break',
    // 'inline code',
    // // 'link',
    'bold',
    // 'italic',
    // 'strikethrough',
  ],
  includesFormattingMarks: false,
}

const renderHTMLToMarkdown = (string, options = {}) => {
  const allOptions = {
    ...defaultOptions,
    ...options,
  }
  const { allowedParsers } = allOptions
  let renderedString = string

  renderedString = entities.decode(renderedString)

  const parsersToUse = allowedParsers.reduce((accumulator, parserName) => {
    const parser = parsers[parserName]

    if (!parser) {
      return console.error(`No parser exists for "${parserName}"`)
    }

    accumulator.push(parser)

    return accumulator
  }, [])

  parsersToUse.forEach(({ regex, replacer }) => {
    renderedString = renderedString.replace(regex, (...args) => replacer(allOptions, ...args))
  })

  return renderedString
}





export default renderHTMLToMarkdown
