// Local imports
import definitions from './definitions'





class MarkdownToHTMLParser {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static defaultOptions = {
    exclude: [],
  }





  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  options = {}

  constructor (options = {}) {
    this.options = {
      ...MarkdownToHTMLParser.defaultOptions,
      ...options,
    }
  }

  parse = string => {
    let renderedString = string

    Object.entries(definitions).forEach(([definitionName, definition]) => {
      if (this.options.exclude.includes(definitionName)) {
        return
      }

      if (this.options.include && !this.options.include.includes(definitionName)) {
        return
      }

      const {
        regex,
        replacer,
      } = definition

      if (typeof replacer === 'string') {
        renderedString = renderedString.replace(regex, replacer)
      } else {
        renderedString = renderedString.replace(regex, (...args) => replacer(this.options, ...args))
      }
    })

    return renderedString
  }

  setOption = (optionName, newValue, merge = false) => {
    const currentValue = this.options[optionName]

    if (merge) {
      if (Array.isArray(currentValue)) {
        this.options[optionName] = [
          ...currentValue,
          ...newValue,
        ]
      } else if (typeof currentValue === 'object') {
        this.options[optionName] = {
          ...currentValue,
          ...newValue,
        }
      } else {
        console.warn('The `merge` option may only be used with `array`s or `object`s')
      }

      return
    }

    this.options[optionName] = newValue
  }
}





export default MarkdownToHTMLParser
