import { createContext, useContext, useState } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

const ThemeContext = createContext('dark')
const SizeContext = createContext('medium')

function Toolbar() {
  const theme = useContext(ThemeContext)
  const size = useContext(SizeContext)
  return (
    <div style={{ padding: '1rem', borderRadius: 8, background: theme === 'dark' ? '#1a1a2e' : '#f0f0f0', color: theme === 'dark' ? '#e0e0f0' : '#111' }}>
      <p>Theme: <strong>{theme}</strong> | Size: <strong>{size}</strong></p>
    </div>
  )
}

export default function ContextDirect() {
  const [theme, setTheme] = useState('dark')
  const [size, setSize] = useState('medium')

  return (
    <>
      <h2>Context as Provider</h2>
      <p className={styles.fileRef}>src/examples/ContextDirect.jsx</p>
      <p className={styles.description}>
        Prior to React 19, every context required a <code>.Provider</code> wrapper
        (<code>{'<ThemeContext.Provider value="dark">'}</code>). React 19 simplifies this
        by allowing the context object itself to be used as a provider:
        <code>{'<ThemeContext value="dark">'}</code>. The <code>.Provider</code> syntax
        still works and is not removed — it's simply no longer necessary. This change
        makes context usage more concise and intuitive, especially when working with
        multiple nested contexts. The value is passed directly as a prop on the context
        component, just like any other component prop. Consumers still use
        <code>useContext</code> or <code>use()</code> the same way.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div className={styles.formGroup}>
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <ThemeContext value={theme}>
        <SizeContext value={size}>
          <Toolbar />
        </SizeContext>
      </ThemeContext>

      <CodeBlock code={`const ThemeContext = createContext('dark')

// React 19 — no .Provider needed:
<ThemeContext value="dark">
  <App />
</ThemeContext>

// Old way (still works):
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>`} />
    </>
  )
}
