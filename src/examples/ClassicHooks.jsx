import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

const hooks = [
  {
    title: 'useState',
    desc: 'Manages component-local state. Returns a stateful value and a setter function.',
    code: `const [count, setCount] = useState(0)

// Usage:
setCount(count + 1)
setCount(prev => prev + 1)`,
  },
  {
    title: 'useEffect',
    desc: 'Performs side effects (data fetching, subscriptions, DOM manipulation). Runs after render.',
    code: `useEffect(() => {
  document.title = \`Count: \${count}\`
  return () => {
    // cleanup runs on unmount & before re-run
  }
}, [count]) // re-run when \`count\` changes`,
  },
  {
    title: 'useRef',
    desc: 'Persists mutable values across renders without causing re-renders. Commonly used for DOM references.',
    code: `const inputRef = useRef(null)

function focusInput() {
  inputRef.current?.focus()
}

return <input ref={inputRef} />`,
  },
  {
    title: 'useContext',
    desc: 'Consumes a React context value. Returns the nearest context value from the provider tree.',
    code: `const ThemeContext = createContext('dark')

function Child() {
  const theme = useContext(ThemeContext)
  return <p>Current theme: {theme}</p>
}

function App() {
  return (
    <ThemeContext value="dark">
      <Child />
    </ThemeContext>
  )
}`,
  },
  {
    title: 'useReducer',
    desc: 'Manages complex state with a reducer function. Like useState but with dispatched actions.',
    code: `const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'increment' })`,
  },
  {
    title: 'useMemo',
    desc: 'Memoizes a computed value. Recalculates only when dependencies change.',
    code: `const sortedList = useMemo(() => {
  return items.sort((a, b) =>
    a.name.localeCompare(b.name)
  )
}, [items])`,
  },
  {
    title: 'useCallback',
    desc: 'Memoizes a function reference. Prevents unnecessary re-renders of child components.',
    code: `const handleClick = useCallback(() => {
  doSomething(a, b)
}, [a, b])

// Equivalent to:
const handleClick = useMemo(
  () => () => doSomething(a, b),
  [a, b]
)`,
  },
  {
    title: 'useImperativeHandle',
    desc: 'Customizes the instance value exposed to parent components when using ref.',
    code: `const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { inputRef.current.value = '' },
  }))

  return <input ref={inputRef} />
})

// Parent:
inputRef.current.focus()
inputRef.current.clear()`,
  },
  {
    title: 'useLayoutEffect',
    desc: 'Like useEffect but fires synchronously after all DOM mutations (before browser paint).',
    code: `useLayoutEffect(() => {
  const rect = element.getBoundingClientRect()
  // adjust layout based on measurements
}, [])`,
  },
  {
    title: 'useDebugValue',
    desc: 'Displays a custom label in React DevTools for custom hooks.',
    code: `function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  useDebugValue(
    isOnline ? 'Online' : 'Offline'
  )

  return isOnline
}`,
  },
]

export default function ClassicHooks() {
  return (
    <>
      <h2>Classic React Hooks</h2>
      <p className={styles.fileRef}>src/examples/ClassicHooks.jsx</p>
      <p className={styles.description}>
        Before diving into React 19, it's important to understand the foundational hooks
        introduced in React 16.8 that every React developer should know. Hooks let you use
        state, lifecycle, and other React features in functional components without writing
        a class. Each hook serves a specific purpose: <code>useState</code> for local state,
        <code>useEffect</code> for side effects, <code>useRef</code> for mutable references,
        <code>useContext</code> for consuming context, <code>useReducer</code> for complex
        state logic, <code>useMemo</code> and <code>useCallback</code> for performance
        optimization, <code>useImperativeHandle</code> for custom ref exposure,
        <code>useLayoutEffect</code> for synchronous DOM measurements, and
        <code>useDebugValue</code> for DevTools labels.
      </p>

      {hooks.map((hook) => (
        <div key={hook.title} className={styles.hookCard}>
          <h3 className={styles.hookTitle}>{hook.title}</h3>
          <p className={styles.hookDesc}>{hook.desc}</p>
          <CodeBlock code={hook.code} />
        </div>
      ))}
    </>
  )
}
