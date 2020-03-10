// Module imports
import React, {
  useRef,
  useState,
} from 'react'
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types'





// Local imports
import {
  parsers,
  // liveParsersByTag as parsersByTag,
  // supportedTags,
} from './parsers'
// import renderHTMLToMarkdown from './renderHTMLToMarkdown'
import renderMarkdownToHTML from './renderMarkdownToHTML'





// Local constants
// const blockNodeNames = [
//   'blockquote',
//   'h1',
//   'h2',
//   'h3',
//   'h4',
//   'h5',
//   'h6',
//   'ol',
//   'pre',
//   'ul',
// ]
// const inlineNodeNames = [
//   'a',
//   'b',
//   'em',
//   'i',
//   's',
//   'strong',
// ]
const markdownRenderOptions = {
  preserveFormattingMarks: true,
}

const parseNodesFromTreeWalker = treeWalker => {
  let { currentNode } = treeWalker

  const parseNode = parserName => {
    const parser = parsers[parserName]
    parser.renderMarkdownToHTML({ node: currentNode })
  }

  while (currentNode) {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      Object.keys(parsers).forEach(parseNode)
    }

    currentNode = treeWalker.nextNode()
  }
}





const MarkdownEditor = props => {
  const [currentValue] = useState(renderMarkdownToHTML(props.defaultValue || props.value, markdownRenderOptions))
  const contentEditableRef = useRef(null)

  const handleChange = () => {
    const selection = window.getSelection()
    // const mainNode = contentEditableRef.current
    // const formattedNodes = Array.from(mainNode.querySelectorAll(supportedTags.join(','))).reverse()

    // formattedNodes.forEach(node => {
    //   const {
    //     innerText,
    //     nodeName,
    //   } = node

    //   const parser = parsersByTag[nodeName.toLowerCase()]

    //   if (parser && innerText) {
    //     parser.fixBrokenMarkdown({ node })
    //   }
    // })

    const treeWalker = document.createTreeWalker(
      selection.getRangeAt(0).commonAncestorContainer,
      NodeFilter.SHOW_ALL,
    )

    parseNodesFromTreeWalker(treeWalker)
  }

  return (
    <ContentEditable
      className="markdown-editor"
      html={currentValue}
      innerRef={contentEditableRef}
      onChange={handleChange} />
  )
}

MarkdownEditor.defaultProps = {
  defaultValue: '',
  value: '',
}

MarkdownEditor.propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
}





export default MarkdownEditor
