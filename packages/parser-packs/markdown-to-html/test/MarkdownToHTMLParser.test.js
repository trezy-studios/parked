// Module imports
import { expect } from 'chai'
import path from 'path'





// Local imports
import { MarkdownToHTMLParser } from '../dist'
import compileExamples from '../../../test-utils/compileExamples'





// Local constants
const examples = compileExamples(path.resolve(__dirname, 'examples'))





describe('MarkdownToHTMLParser', () => {
  let parser = null

  beforeEach(() => {
    parser = new MarkdownToHTMLParser
  })

  afterEach(() => {
    parser = null
  })

  describe('constructor()', () => {
    it('creates a new instance of `MarkdownToHTMLParser`', () => {
      expect(parser).to.be.an.instanceof(MarkdownToHTMLParser)
    })
  })

  describe('parse()', () => {
    Object.entries(examples).forEach(([name, { html, md }]) => {
      it(name, () => {
        if (name !== 'kitchen-sink') {
          parser.setOption('include', [name])
        }

        expect(parser.parse(md)).to.equal(html)
      })
    })
  })
})
