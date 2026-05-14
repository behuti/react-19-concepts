import { useActionState } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

async function submitName(prevState, formData) {
  await new Promise((r) => setTimeout(r, 1500))
  const name = formData.get('name')
  if (!name || name.trim().length < 2) {
    return { error: 'Name must be at least 2 characters' }
  }
  return { success: `Hello, ${name}!` }
}

export default function UseActionStateDemo() {
  const [state, formAction, isPending] = useActionState(submitName, null)

  return (
    <>
      <h2>useActionState</h2>
      <p className={styles.fileRef}>src/examples/UseActionStateDemo.jsx</p>
      <p className={styles.description}>
        <code>useActionState</code> replaces the traditional <code>onSubmit</code> +
        <code>useState</code> pattern for forms. You pass it an async action function
        and an initial state, and it returns a tuple of <code>[state, formAction, isPending]</code>.
        The <code>formAction</code> is used directly as the form's <code>action</code> prop —
        React handles the <code>FormData</code> extraction automatically. The action receives
        the previous state (useful for accumulators or undo) and the submitted <code>FormData</code>.
        <code>isPending</code> tells you whether the action is currently running, making it
        easy to disable buttons and show loading states without manual tracking.
      </p>

      <form action={formAction}>
        <div className={styles.formGroup}>
          <label>Your Name</label>
          <input name="name" placeholder="Enter your name" required />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {state && (
        <div className={`${styles.statusMsg} ${state.error ? styles.error : styles.success}`}>
          {state.error || state.success}
        </div>
      )}

      <CodeBlock code={`const [state, formAction, isPending] =
  useActionState(submitAction, initialState)

// formAction replaces the old onSubmit pattern
// React manages pending + form state for you`} />
    </>
  )
}
