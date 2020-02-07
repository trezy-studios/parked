// Module imports
import fs from 'fs'
import path from 'path'





// Local imports
import normalizeHTML from './normalizeHTML'
import normalizeMarkdown from './normalizeMarkdown'





const compileExamples = examplesPath => {
  const exampleFilenames = fs.readdirSync(examplesPath)

  return exampleFilenames.reduce((accumulator, filename) => {
    const {
      ext,
      name,
    } = path.parse(filename)

    if (['.html', '.md'].includes(ext)) {
      if (!accumulator[name]) {
        accumulator[name] = {}
      }

      const filePath = path.resolve(examplesPath, filename)
      let fileContents = fs.readFileSync(filePath, 'utf8')

      switch (ext) {
        case '.html':
          fileContents = normalizeHTML(fileContents)
          break
        case '.md':
          fileContents = normalizeMarkdown(fileContents)
          break
      }

      accumulator[name][ext.replace(/^\./u, '')] = fileContents
    }

    return accumulator
  }, {})
}





export default compileExamples
