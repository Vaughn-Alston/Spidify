import { readFileSync } from 'node:fs'
import { parseProject, createIssueBody } from './parser.ts'

const designDoc = readFileSync(
  new URL('../../docs/design-doc.md', import.meta.url),
  'utf-8',
)

const project = parseProject(designDoc, {
  id: 'spidify-design-document',
  name: 'Spidify Design Document',
})

console.log(designDoc)

for (const phase of project.phases) {
  console.log('\n--------------------')
  console.log(phase.title)
  console.log(createIssueBody(phase))
}
