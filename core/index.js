const markdownToHTML = string => string.replace(/\*\*(.+?)\*\*/gu, '<strong>$1</strong>')





export {
  markdownToHTML,
}
