import { useState } from 'react'
import styles from '../styles/examples.module.scss'

const categories = [
  {
    name: 'Core Concepts',
    questions: [
      {
        q: 'What is React?',
        a: 'React is a JavaScript library for building user interfaces. It uses a component-based architecture, declarative rendering, and the Virtual DOM to efficiently update the UI in response to state changes.',
      },
      {
        q: 'What is JSX?',
        a: 'JSX is a syntax extension for JavaScript that looks like HTML. It is compiled to React.createElement() calls, allowing you to write UI structure alongside logic in a readable way.',
      },
      {
        q: 'Controlled vs uncontrolled components?',
        a: 'A controlled component\'s value is managed by React state — rendering from state and updating via event handlers. An uncontrolled component stores its own internal DOM state, accessed via ref.',
      },
      {
        q: 'What is the key prop and why is it important?',
        a: 'The key prop helps React identify which items in a list have changed, been added, or removed. Using stable, unique keys (like IDs) prevents unnecessary re-renders and maintains component state across re-orders.',
      },
      {
        q: 'What is lifting state up?',
        a: 'Moving shared state to the closest common ancestor of components that need it. This avoids duplicating state and keeps data flow predictable and unidirectional.',
      },
    ],
  },
  {
    name: 'Hooks',
    questions: [
      {
        q: 'What are the Rules of Hooks?',
        a: '1) Call hooks at the top level (not inside loops, conditions, or nested functions). 2) Call hooks only from React function components or custom hooks.',
      },
      {
        q: 'useState vs useReducer — when to use which?',
        a: 'useState for simple, independent state values (toggles, inputs, counters). useReducer for complex state logic with multiple sub-values or when the next state depends on the previous state in non-trivial ways.',
      },
      {
        q: 'useMemo vs useCallback?',
        a: 'useMemo memoizes a computed value. useCallback memoizes a function reference — it is equivalent to useMemo(() => fn, deps).',
      },
      {
        q: 'When does useEffect run?',
        a: 'After the initial render (mount). After every render where dependencies changed. The cleanup function runs before unmount and before re-running the effect.',
      },
      {
        q: 'useEffect vs useLayoutEffect?',
        a: 'useEffect runs asynchronously after the browser paints. useLayoutEffect runs synchronously after DOM mutations but before the browser paints. Use useLayoutEffect when you need to read layout and synchronously re-render.',
      },
    ],
  },
  {
    name: 'React 19',
    questions: [
      {
        q: 'What is the use() hook?',
        a: 'use() reads a promise or context directly inside render. Unlike other hooks, use() can be called conditionally and inside loops. When used with a promise, it suspends the component until the promise resolves.',
      },
      {
        q: 'What are React Actions?',
        a: 'Actions are async functions passed to startTransition or form actions. They enable automatic pending state management, error handling, and optimistic updates.',
      },
      {
        q: 'What changed with ref in React 19?',
        a: 'ref is now a regular prop. You can pass it directly without forwardRef. The forwardRef wrapper is deprecated but still works.',
      },
      {
        q: 'What changed with Context in React 19?',
        a: 'You can now use <Context> directly as a provider instead of <Context.Provider>. The .Provider syntax is still supported.',
      },
      {
        q: 'Can React 19 render document metadata in components?',
        a: 'Yes. title, meta, link, and other document head tags can be rendered directly in components. React automatically hoists them to the document head.',
      },
    ],
  },
  {
    name: 'Performance & Architecture',
    questions: [
      {
        q: 'How does React\'s reconciliation algorithm work?',
        a: 'React compares VDOM trees using a diffing algorithm. Elements of different types cause a full rebuild. Same-type elements are updated in place. The key prop identifies stable list items across re-renders.',
      },
      {
        q: 'React.memo vs useMemo?',
        a: 'React.memo is a higher-order component that prevents re-rendering if props haven\'t changed (shallow comparison). useMemo is a hook that memoizes a computed value within a component.',
      },
      {
        q: 'What is React StrictMode?',
        a: 'A development-only wrapper that intentionally double-invokes renders, effects, and other lifecycle methods to detect side effects and find bugs early. It has no effect in production.',
      },
      {
        q: 'Shadow DOM vs Virtual DOM?',
        a: 'Shadow DOM is a browser technology for scoping CSS and DOM subtrees. Virtual DOM is a JavaScript concept for optimizing UI updates. They solve different problems.',
      },
    ],
  },
]

export default function InterviewQs() {
  const [openCategory, setOpenCategory] = useState(null)
  const [openQuestion, setOpenQuestion] = useState(null)

  return (
    <>
      <h2>Common React Interview Questions</h2>
      <p className={styles.fileRef}>src/examples/InterviewQs.jsx</p>
      <p className={styles.description}>
        A curated collection of frequently asked React interview questions covering
        core concepts, hooks, React 19 features, and performance topics.
      </p>

      {categories.map((cat) => (
        <div key={cat.name} className={styles.qaCategory}>
          <div
            className={styles.qaCategoryHeader}
            onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
          >
            <h3>{cat.name}</h3>
            <span>{openCategory === cat.name ? '−' : '+'}</span>
          </div>

          {openCategory === cat.name && (
            <div className={styles.qaList}>
              {cat.questions.map((item) => (
                <div key={item.q} className={styles.qaItem}>
                  <div
                    className={styles.qaQuestion}
                    onClick={() => setOpenQuestion(openQuestion === item.q ? null : item.q)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.qaToggle}>
                      {openQuestion === item.q ? '▲' : '▼'}
                    </span>
                  </div>
                  {openQuestion === item.q && (
                    <div className={styles.qaAnswer}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}
