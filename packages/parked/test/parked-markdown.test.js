// Module imports
import { expect } from 'chai'
import path from 'path'





// Local imports
import {
  MarkdownToHTMLParser,
  Parked,
} from '../dist'
import compileExamples from '../../test-utils/compileExamples'





// Local constants
const examples = compileExamples(path.resolve(__dirname, 'examples'))





describe('Parked + MarkdownToHTMLParser', function () {
  let parked = null

  beforeEach(() => {
    parked = new Parked({
      parser: MarkdownToHTMLParser,
    })
  })

  afterEach(() => {
    parked = null
  })

  describe('constructor', function () {
    it('creates a new instance of `Parked`', function () {
      expect(parked).to.be.an.instanceof(Parked)
    })

    it('creates a new instance of `MarkdownToHTMLParser`', function () {
      expect(parked.parser).to.be.an.instanceof(MarkdownToHTMLParser)
    })
  })

  describe('parse', function () {
    const {
      html,
      md,
    } = examples['kitchen-sink']

    it('should parse markdown', () => {
      expect(parked.parse(md)).to.equal(html)
    })
  })
})
