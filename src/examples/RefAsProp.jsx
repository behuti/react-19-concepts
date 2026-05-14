import { useRef } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

function Input({ ref, label, ...props }) {
  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  )
}

export default function RefAsProp() {
  const inputRef = useRef(null)

  function focus() {
    inputRef.current?.focus()
  }

  return (
    <>
      <h2>ref as a Prop</h2>
      <p className={styles.fileRef}>src/examples/RefAsProp.jsx</p>
      <p className={styles.description}>
        In React 18 and earlier, <code>ref</code> was not passed through props —
        it was handled specially by React and required <code>forwardRef</code> to be
        passed to custom components. React 19 removes this limitation: <code>ref</code>
        is now a regular prop that flows through components just like any other prop.
        Simply destructure it in your component and pass it to the underlying DOM element.
        The <code>forwardRef</code> wrapper is deprecated but still works for backwards
        compatibility. This change simplifies component APIs, reduces boilerplate, and
        makes ref forwarding feel natural and intuitive.
      </p>

      <Input ref={inputRef} label="Click the button to focus this input" placeholder="This input uses ref directly" />
      <button onClick={focus}>Focus Input</button>

      <CodeBlock code={`// React 18: had to use forwardRef
const Input = forwardRef((props, ref) => (
  <input ref={ref} />
))

// React 19: ref is just a prop
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />
}`} />
    </>
  )
}
