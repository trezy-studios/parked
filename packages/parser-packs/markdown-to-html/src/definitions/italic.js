export default {
  replacer: (options, match, content) => {
    const { preserveFormattingMarks } = options

    if (/^\*\*/gu.test(match) || /\*\*$/gu.test(match)) {
      return match
    }

    if (preserveFormattingMarks) {
      return `<em>*${content}*</em>`
    }

    return `<em>${content}</em>`
  },
  regex: /\*(.+?)\*/gu,
}
