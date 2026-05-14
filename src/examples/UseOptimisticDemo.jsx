import { useState, useOptimistic, useRef } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

function sendMessage(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (text.toLowerCase().includes('error')) {
        reject(new Error('Simulated failure'))
      } else {
        resolve({ id: Date.now(), text, sent: true })
      }
    }, 1500)
  })
}

export default function UseOptimisticDemo() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', sent: true },
  ])
  const formRef = useRef(null)

  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, newMsg) => [...state, newMsg]
  )

  async function formAction(formData) {
    const text = formData.get('message')
    if (!text.trim()) return

    formRef.current?.reset()

    addOptimistic({ id: Date.now(), text, sent: false })

    try {
      const sent = await sendMessage(text)
      setMessages((prev) => [...prev, sent])
    } catch {
      setMessages((prev) => [...prev, { id: Date.now(), text: `${text} (failed)`, sent: false }])
    }
  }

  return (
    <>
      <h2>useOptimistic</h2>
      <p className={styles.fileRef}>src/examples/UseOptimisticDemo.jsx</p>
      <p className={styles.description}>
        <code>useOptimistic</code> enables optimistic UI — showing the expected result
        immediately while the async operation completes in the background. It takes the
        current state and a reducer function that merges optimistic values into the state.
        The hook returns the optimistic state (which may include pending items) and an
        <code>addOptimistic</code> function to trigger an optimistic update. When the real
        async action resolves, React reconciles the optimistic state with the actual state.
        If the action fails, the optimistic update automatically reverts to the real state.
        This pattern is ideal for chat messages, likes, toggles, and any UI where
        instantaneous feedback dramatically improves the user experience.
      </p>

      <form action={formAction} ref={formRef}>
        <div className={styles.formGroup}>
          <label>Message</label>
          <input name="message" placeholder="Type a message... (type 'error' to simulate failure)" />
        </div>
        <button type="submit">Send</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        {optimisticMessages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.listItem} ${!msg.sent ? styles.optimistic : ''}`}
          >
            <span>{msg.text}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {msg.sent ? 'sent' : 'sending...'}
            </span>
          </div>
        ))}
      </div>

      <CodeBlock code={`const [optimisticValue, addOptimistic] =
  useOptimistic(state, (current, optimisticValue) => ({
    ...current, ...optimisticValue
  }))

addOptimistic({ text: 'Hi!' }) // shows immediately`} />
    </>
  )
}
