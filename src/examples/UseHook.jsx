import { useState, use, Suspense } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}`, email: `user${id}@example.com` })
    }, 1500)
  })
}

const userCache = new Map()

function getUserResource(id) {
  if (!userCache.has(id)) {
    userCache.set(id, fetchUser(id))
  }
  return userCache.get(id)
}

function UserDetails({ userId }) {
  const user = use(getUserResource(userId))
  return (
    <div>
      <p><strong>{user.name}</strong></p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{user.email}</p>
    </div>
  )
}

export default function UseHook() {
  const [userId, setUserId] = useState(1)

  return (
    <>
      <h2>use() Hook</h2>
      <p className={styles.fileRef}>src/examples/UseHook.jsx</p>
      <p className={styles.description}>
        <code>use()</code> is a new React 19 hook that reads a promise or context directly
        inside render. Unlike other hooks, <code>use()</code> can be called conditionally
        and inside loops — it does not follow the standard Rules of Hooks.
        When given a promise, it suspends the component until the promise resolves,
        integrating natively with <code>{'<Suspense>'}</code>. This eliminates the
        need for the traditional <code>useEffect</code> + <code>useState</code> pattern
        for data fetching. The example below caches promises in a <code>Map</code> so
        re-renders with the same ID return the cached promise instead of creating a new one.
      </p>

      <div className={styles.formGroup}>
        <label>Select User ID</label>
        <select value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      </div>

      <Suspense fallback={<div className={`${styles.statusMsg} ${styles.pending}`}>Loading user...</div>}>
        <UserDetails userId={userId} />
      </Suspense>

      <CodeBlock code={`const data = use(fetchPromise)
// You can also use with Context:
// const theme = use(ThemeContext)`} />
    </>
  )
}
