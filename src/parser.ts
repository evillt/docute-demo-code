import {
  stripDemoBlock,
  parseComponent,
  registerComponent,
  Text
} from './utils'

export default function(text: Text): Text {
  const startTag = ':::demo'
  const startTagLen = startTag.length
  const endTag = ':::'
  const endTagLen = endTag.length

  let id = 0
  let store = []
  let start = 0
  let outputString = text

  let demoStart = text.indexOf(startTag)
  let demoEnd = text.indexOf(endTag, demoStart + startTagLen) + endTagLen

  while (demoStart !== -1 && demoEnd !== -1) {
    const demo = text.slice(demoStart, demoEnd)
    store.push(demo)

    const parsed = parseComponent(demo)
    registerComponent(parsed, id)

    outputString = outputString.replace(
      demo,
      `<Demo${id}/>\n\n${stripDemoBlock(demo)}`
    )

    id++
    start = demoEnd
    demoStart = text.indexOf(startTag, start)
    demoEnd = text.indexOf(endTag, demoStart + startTagLen) + endTagLen
  }

  return outputString
}
