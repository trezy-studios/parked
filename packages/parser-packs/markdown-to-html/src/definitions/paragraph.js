export default {
  liveParse: false,
  replacer: (options, match, content) => {
    if (!content) {
      return ''
    }

    return `<p>${content}</p>`
  },
  regex: /(.*(?:\n.*)*?)(\n\n+|$)/gmu,
}
