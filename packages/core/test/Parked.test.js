// Module imports
import { expect } from 'chai'





// Local imports
import { Parked } from '../dist'





// Local constants
const createMockParser = () => class {
  parse = string => `blep ${string} blep`
}
const versionStringRegex = /^Parked (v\d\.\d\.\d|Development Build) - Built on \d{2} \w+, \d{4} \d{2}:\d{2}:\d{2}[+-]\d{4}$/





describe('Parked', function () {
  describe('constructor', function () {
    describe('config', function () {
      const createParked = config => () => new Parked(config)

      it('throws an error when missing the config', function () {
        expect(createParked()).to.throw()
      })

      it('throws an error when missing the `parser` config', function () {
        expect(createParked({})).to.throw()
      })
    })

    it('creates a new instance of `Parked`', function () {
      const parked = new Parked({
        parser: true,
      })

      expect(parked).to.be.an.instanceof(Parked)
    })
  })

  describe('parse', function () {
    it('parses a string', function () {
      const stringToParse = 'foo bar baz'
      const parked = new Parked({
        parser: createMockParser(),
      })

      expect(parked.parse).to.be.a('function')
      expect(parked.parse(stringToParse)).to.equal(`blep ${stringToParse} blep`)
    })
  })

  describe('static version', function () {
    it('returns the current version and build date of the library', function () {
      expect(Parked.version).to.be.a('string')
      expect(Parked.version).to.match(versionStringRegex)
    })
  })

  describe('instance version', function () {
    it('returns the current version and build date of the library', function () {
      const parked = new Parked({
        parser: createMockParser(),
      })

      expect(parked.version).to.be.a('string')
      expect(parked.version).to.match(versionStringRegex)
    })
  })
})
