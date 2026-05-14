import { useState, useTransition } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

const posts = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  title: `Post #${i + 1}`,
  body: `This is the content of post number ${i + 1}.`.repeat(5),
}))

function searchPosts(query) {
  return posts.filter(
    (p) => p.title.includes(query) || p.body.includes(query)
  )
}

export default function UseTransitionDemo() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(posts)
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    const value = e.target.value
    setQuery(value)
    startTransition(() => {
      setResults(value ? searchPosts(value) : posts)
    })
  }

  return (
    <>
      <h2>useTransition + Actions</h2>
      <p className={styles.fileRef}>src/examples/UseTransitionDemo.jsx</p>
      <p className={styles.description}>
        <code>useTransition</code> solves the problem of slow state updates blocking
        the UI. It marks certain state updates as low-priority ("transitions"), allowing
        the browser to stay responsive to user input like typing and clicking even during
        heavy re-renders. The returned <code>isPending</code> flag lets you show loading
        feedback. In React 19, <code>startTransition</code> also accepts async functions
        (called <strong>Actions</strong>), making it possible to handle async workflows
        like form submissions and data fetching within transitions. This example searches
        10,000 posts — try typing to see how the input stays responsive while results update.
      </p>

      <div className={styles.formGroup}>
        <label>Search 10,000 posts</label>
        <input
          value={query}
          onChange={handleChange}
          placeholder="Type to search..."
        />
      </div>

      <div className={styles.formStatusBar}>
        {isPending
          ? 'Updating results...'
          : `${results.length} results found`}
        {isPending && <span className={`${styles.statusMsg} ${styles.pending}`}> (pending transition)</span>}
      </div>

      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        {results.slice(0, 50).map((p) => (
          <div key={p.id} className={styles.listItem}>
            <span>{p.title}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {p.body.slice(0, 40)}...
            </span>
          </div>
        ))}
      </div>

      <CodeBlock code={`const [isPending, startTransition] = useTransition()

startTransition(async () => {
  // React 19: async actions
  const data = await fetchData()
  setState(data)
})`} />
    </>
  )
}
