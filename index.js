const markdownToHTML = string => {
  return string.replace(/\*\*(.+?)\*\*/gu, '<strong>$1</strong>')
}





export {
  markdownToHTML
}
