import { highlightToHtml } from '../utils/highlight'

export default function CodeBlock({ code }) {
  return (
    <pre dangerouslySetInnerHTML={{ __html: highlightToHtml(code) }} />
  )
}
