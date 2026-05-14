import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

async function simulateSubmit(prevState, formData) {
  await new Promise((r) => setTimeout(r, 2000))
  const email = formData.get('email')
  if (!email || !email.includes('@')) {
    return { error: 'Invalid email address' }
  }
  return { success: 'Subscribed successfully!' }
}

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <div>
      <button type="submit" disabled={pending}>
        {pending ? 'Subscribing...' : 'Subscribe'}
      </button>
      {pending && data && (
        <div className={`${styles.statusMsg} ${styles.pending}`}>
          Submitting {data.get('email')} via {method?.toUpperCase()}
        </div>
      )}
    </div>
  )
}

export default function UseFormStatusDemo() {
  const [state, formAction] = useActionState(simulateSubmit, null)

  return (
    <>
      <h2>useFormStatus</h2>
      <p className={styles.fileRef}>src/examples/UseFormStatusDemo.jsx</p>
      <p className={styles.description}>
        <code>useFormStatus</code>, imported from <code>react-dom</code>, gives any
        component nested inside a <code>{'<form>'}</code> access to the form's submission
        state without prop drilling. It returns an object with <code>pending</code> (boolean —
        whether the form is submitting), <code>data</code> (the <code>FormData</code> being
        submitted), <code>method</code> (GET/POST), and <code>action</code> (the action function
        passed to the form). This is especially useful for custom submit buttons, loading
        indicators, and form validation feedback that live deep in the component tree.
        It pairs naturally with <code>useActionState</code> for the parent form logic.
      </p>

      <form action={formAction}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com" required />
        </div>
        <SubmitButton />
      </form>

      {state && (
        <div className={`${styles.statusMsg} ${state.error ? styles.error : styles.success}`}>
          {state.error || state.success}
        </div>
      )}

      <CodeBlock code={`import { useFormStatus } from 'react-dom'

function SubmitBtn() {
  const { pending, data, method, action }
    = useFormStatus()
  return <button disabled={pending}>...</button>
}

// Works from any nested child of <form>, no props!`} />
    </>
  )
}
