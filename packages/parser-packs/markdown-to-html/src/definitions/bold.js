export default {
  replacer: (options, match, content) => {
    const { preserveFormattingMarks } = options

    if (/^\*\*\*/gu.test(match) || /\*\*\*$/gu.test(match)) {
      return match
    }

    if (preserveFormattingMarks) {
      return `<strong>**${content}**</strong>`
    }

    return `<strong>${content}</strong>`
  },
  regex: /\*\*(.+?)\*\*/gu,
}
