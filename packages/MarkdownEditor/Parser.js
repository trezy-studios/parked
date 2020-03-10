class Parser {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static defaultOptions = {
    flags: ['g', 'i', 'u'],
    liveParse: true,
    multiline: false,
    tags: [],
    type: 'inline',
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  /* eslint-disable babel/no-invalid-this */
  #compileRegex = () => {
    if (!this.regex || !this.tagRegex || !this.perfectRegex) {
      const {
        flags,
        mark,
        tags,
      } = this.options
      const safeMark = mark.replace(/([.*[\]()])/gu, '\\$1')
      const flagString = flags.join('')
      const regexString = `${safeMark}(.+?)${safeMark}`

      if (!this.regex) {
        this.regex = new RegExp(regexString, flagString)
      }

      // `perfectRegex` represents the case where the relevant string should be
      // the only thing being tested, i.e. it is not sorrounded by other text
      if (!this.perfectRegex) {
        this.perfectRegex = new RegExp(`^${regexString}$`, flagString)
      }

      // `tagRegex` allows us to find strings that this parser has already parsed,
      // ignoring whether or not the mark syntax is correct.
      if (!this.tagRegex) {
        this.tagRegex = new RegExp(
          String.raw`<(?:${tags.join('|')}).*?>(.*?)<\/(?:${tags.join('|')})>`,
          flagString,
        )
      }
    }
  }
  /* eslint-enable babel/no-invalid-this */





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (options = {}) {
    this.options = {
      ...Parser.defaultOptions,
      ...options,
    }

    const {
      flags,
      multiline,
      perfectRegex,
      regex,
      tagRegex,
    } = this.options

    if (multiline) {
      flags.push('m')
    }

    this.perfectRegex = perfectRegex
    this.regex = regex
    this.tagRegex = tagRegex

    this.#compileRegex()
  }

  findByTag = string => [...string.matchAll(this.tagRegex)]

  fixBrokenMarkdown = ({ node }) => {
    const [match] = this.getPerfectMatches(node.innerText.trim())
    const [original] = match || []

    if (!original) {
      const { outerHTML } = node
      const [[, content]] = this.getTagMatches(outerHTML)
      const newNode = document.createTextNode(content)
      const range = document.createRange()
      const selection = window.getSelection()

      const anchorPoint = selection.anchorOffset
      const focusPoint = selection.focusOffset

      range.selectNode(node)
      range.deleteContents()
      range.insertNode(newNode)

      range.setStart(newNode, anchorPoint)
      range.setEnd(newNode, focusPoint)

      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  getMatches = string => [...string.matchAll(this.regex)]

  getPerfectMatches = string => [...string.matchAll(this.perfectRegex)]

  getTagMatches = string => [...string.matchAll(this.tagRegex)]

  /* eslint-disable max-statements */
  renderMarkdownToHTML = ({ node }) => {
    const selection = window.getSelection()
    const {
      anchorOffset,
      focusOffset,
    } = selection
    let parentNode = node

    const parentNodeIsTextNode = () => (parentNode.nodeType === Node.TEXT_NODE)
    const parentNodeIsInlineElement = () => ['a', 'b', 'code', 'em', 'i', 'span', 'strong'].includes(parentNode.nodeName.toLowerCase())

    while (parentNode && (parentNodeIsTextNode() || parentNodeIsInlineElement())) {
      parentNode = parentNode.parentNode
    }

    if (!parentNode) {
      return
    }

    const content = parentNode?.innerText
    const matches = this.getMatches(content).reverse()

    const [
      selectionStartsAt,
    ] = (anchorOffset < focusOffset) ? ['anchor', 'focus'] : ['focus', 'anchor']

    const selectionStart = {
      node: selection[`${selectionStartsAt}Node`],
      offset: selection[`${selectionStartsAt}Offset`],
    }

    const preTreeWalker = document.createTreeWalker(parentNode.childNodes[0], NodeFilter.SHOW_ALL)
    let selectionStartIndex = 0

    do {
      const { currentNode } = preTreeWalker

      if (currentNode === selectionStart.node) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          selectionStartIndex += selectionStart.offset
        }
        break
      }

      if (currentNode.nodeType === Node.TEXT_NODE) {
        selectionStartIndex += currentNode.length
      } else {
        selectionStartIndex += currentNode.innerText.length
      }
    } while (preTreeWalker.nextNode())

    if (matches.length) {
      const [tag] = this.tags
      const range = document.createRange()

      parentNode.innerHTML = parentNode.innerText

      matches.forEach(match => {
        const newElement = document.createElement(tag)
        const [targetNode] = parentNode.childNodes

        range.setStart(targetNode, match.index)
        range.setEnd(targetNode, match.index + match[0].length)
        range.surroundContents(newElement)
      })

      const postTreeWalker = document.createTreeWalker(parentNode.childNodes[0], NodeFilter.SHOW_ALL)
      let index = 0
      let resetNode = null
      let resetOffset = null

      do {
        const { currentNode } = postTreeWalker
        const currentNodeIsTextNode = (currentNode.nodeType === Node.TEXT_NODE)

        if (currentNodeIsTextNode) {
          index += currentNode.length
        } else {
          index += currentNode.innerText.length
        }

        if (index > selectionStartIndex) {
          if (currentNodeIsTextNode) {
            resetNode = currentNode
          } else {
            resetNode = currentNode.childNodes[0]
          }
          resetOffset = index - selectionStartIndex
          break
        } else if (index === selectionStartIndex) {
          resetNode = currentNode.nextSibling
          resetOffset = index - selectionStartIndex
          break
        }
      } while ((index < selectionStartIndex) && postTreeWalker.nextNode())

      range.setStart(resetNode, resetOffset)
      range.collapse(true)

      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
  /* eslint-enable max-statements */





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get liveParse () {
    return this.options.liveParse
  }

  get markdownReplacer () {
    return this.options.markdownReplacer
  }

  get render () {
    return this.options.render
  }

  get tags () {
    return this.options.tags
  }

  get type () {
    return this.options.type
  }
}





export default Parser
