// Module imports
import { expect } from 'chai'





import { markdownToHTML } from '../'





describe('markdownToHTML', function () {
  describe('with a string', function () {
    describe('containing **bold** text', function () {
      const string = 'this text should be **bold**'
      const result = markdownToHTML(string)

      it('should wrap bold text in <strong /> tags', function () {
        expect(result).to.equal('this text should be <strong>bold</strong>')
      })
    })
  })
})
