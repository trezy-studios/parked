// Module imports
import { expect } from 'chai'





// Local imports
import { definitions } from '../dist'





// Local constants
const requiredKeys = [
  'replacer',
  'regex',
]
const validKeys = [
  ...requiredKeys,
  'liveParse',
]





describe('Definitions', () => {
  Object.entries(definitions).forEach(([definitionName, definitionObject]) => {
    describe(definitionName, () => {
      it('should only include valid keys', () => {
        expect(validKeys).to.include.members(Object.keys(definitionObject))
      })

      it('should include all required keys', () => {
        expect(definitionObject).to.include.all.keys(requiredKeys)
      })
    })
  })
})
