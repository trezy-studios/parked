export default {
  replacer: (options, match, content) => {
    const { preserveFormattingMarks } = options

    if (preserveFormattingMarks) {
      return `<s>~~${content}~~</s>`
    }

    return `<s>${content}</s>`
  },
  regex: /~~(.+?)~~/gu,
}
