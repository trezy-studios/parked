// Local imports
import parserDefinitions from './parser-definitions'
import Parser from './Parser'





const {
  liveParsers,
  liveParsersByTag,
  parsers,
  parsersByTag,
  supportedTags,
} = Object.entries(parserDefinitions).reduce((accumulator, [key, definition]) => {
  const parser = new Parser(definition)

  accumulator.parsers[key] = parser

  if (parser.liveParse) {
    accumulator.liveParsers[key] = parser
  }

  parser.tags.forEach(tag => {
    accumulator.parsersByTag[tag] = parser
    accumulator.supportedTags.push(tag)

    if (parser.liveParse) {
      accumulator.liveParsersByTag[tag] = parser
    }
  })

  return accumulator
}, {
  liveParsers: {},
  liveParsersByTag: {},
  parsers: {},
  parsersByTag: {},
  supportedTags: [],
})





export {
  liveParsers,
  liveParsersByTag,
  parsers,
  parsersByTag,
  supportedTags,
}
