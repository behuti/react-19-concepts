# React 19 Concepts

An interactive educational app that demonstrates React 19 features, hooks, and core concepts through live, runnable examples.

## Getting Started

```bash
npm install
npm run dev
```

## React 19 Features

### `use()` Hook

Reads a promise or context directly inside render, integrating with `Suspense`. No more `useEffect` + `useState` for data fetching.

```jsx
import { use, Suspense } from 'react'

function UserDetails({ userId }) {
  const user = use(fetchUser(userId))
  return <p>{user.name}</p>
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetails userId={1} />
    </Suspense>
  )
}
```

`use()` can also consume context, replacing `useContext`:

```jsx
const theme = use(ThemeContext)
```

### `useTransition` + Actions

Marks state updates as low-priority so the UI stays responsive during heavy rendering. React 19 also supports async functions in `startTransition` (called **Actions**).

```jsx
import { useState, useTransition } from 'react'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(allPosts)
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setQuery(e.target.value)
    startTransition(() => {
      setResults(searchPosts(e.target.value))
    })
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Updating...</span>}
      {results.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}
```

### `useActionState`

Manages form state and pending status automatically. Pass a form action and an initial state; it returns `[state, formAction, isPending]`.

```jsx
import { useActionState } from 'react'

async function submitName(prevState, formData) {
  const name = formData.get('name')
  if (!name || name.trim().length < 2) {
    return { error: 'Name must be at least 2 characters' }
  }
  return { success: `Hello, ${name}!` }
}

function NameForm() {
  const [state, formAction, isPending] = useActionState(submitName, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state && (
        <div>{state.error || state.success}</div>
      )}
    </form>
  )
}
```

### `useFormStatus`

Reads the parent `<form>` status from any descendant component. Returns `pending`, `data`, `method`, and `action` — no prop drilling needed.

```jsx
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, data } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}

function SubscribeForm() {
  const [state, formAction] = useActionState(submitEmail, null)
  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <SubmitButton />
    </form>
  )
}
```

### `useOptimistic`

Shows the result immediately while the async action completes. If the action fails, the optimistic update reverts. Great for chat, likes, etc.

```jsx
import { useOptimistic, useRef } from 'react'

function Chat() {
  const [messages, setMessages] = useState([])
  const formRef = useRef(null)

  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, newMsg) => [...state, newMsg]
  )

  async function formAction(formData) {
    const text = formData.get('message')
    formRef.current?.reset()
    addOptimistic({ id: Date.now(), text, sent: false })

    const sent = await sendMessage(text)
    setMessages(prev => [...prev, sent])
  }

  return (
    <form action={formAction} ref={formRef}>
      <input name="message" />
      <button type="submit">Send</button>
      {optimisticMessages.map(msg => (
        <div key={msg.id} className={!msg.sent ? 'optimistic' : ''}>
          {msg.text} {!msg.sent && '(sending...)'}
        </div>
      ))}
    </form>
  )
}
```

### `ref` as a Prop

In React 19, `ref` is a regular prop — no more `forwardRef` wrapper needed.

```jsx
// React 19
function Input({ ref, label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  )
}

// Usage — ref passed like any other prop
const inputRef = useRef(null)
<Input ref={inputRef} label="Name" />
```

```jsx
// React 18 (old way)
const Input = forwardRef((props, ref) => (
  <input ref={ref} />
))
```

### Context as Provider

React 19 lets you use `<Context>` directly instead of `<Context.Provider>`. The `.Provider` is still supported but no longer required.

```jsx
const ThemeContext = createContext('dark')
const SizeContext = createContext('medium')

// React 19
<ThemeContext value="dark">
  <SizeContext value="medium">
    <Toolbar />
  </SizeContext>
</ThemeContext>

// Old way (still works)
<ThemeContext.Provider value="dark">
  <SizeContext.Provider value="medium">
    <Toolbar />
  </SizeContext.Provider>
</ThemeContext.Provider>
```

### Document Metadata

React 19 natively supports `<title>`, `<meta>`, `<link>` and other document head tags directly in components. They automatically hoist to the document `<head>`.

```jsx
function Page() {
  return (
    <>
      <title>My Page</title>
      <meta name="description" content="Page description" />
      <link rel="canonical" href="https://example.com" />
      <h1>My Page</h1>
    </>
  )
}
```

---

## Classic React Hooks

### `useState`

Manages component-local state.

```jsx
const [count, setCount] = useState(0)
// Usage:
setCount(count + 1)
setCount(prev => prev + 1)
```

### `useEffect`

Performs side effects (data fetching, subscriptions, DOM manipulation).

```jsx
useEffect(() => {
  document.title = `Count: ${count}`
  return () => {
    // cleanup (runs on unmount and before re-run)
  }
}, [count]) // re-run when `count` changes
```

**Phases:**
- Mount: runs the effect
- Update: cleans up previous effect, runs new one (if deps change)
- Unmount: runs cleanup

### `useRef`

Persists mutable values across renders without causing re-renders. Commonly used for DOM references.

```jsx
const inputRef = useRef(null)

function focusInput() {
  inputRef.current?.focus()
}

return <input ref={inputRef} />
```

### `useContext`

Consumes a React context value.

```jsx
const theme = useContext(ThemeContext)
// Returns the nearest <ThemeContext value={...}> value
```

### `useReducer`

Manages complex state with a reducer function. Like `useState` but with actions.

```jsx
const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'increment' })
```

### `useMemo`

Memoizes a computed value. Recalculates only when dependencies change.

```jsx
const sortedList = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name))
}, [items])
```

### `useCallback`

Memoizes a function reference. Prevents unnecessary re-renders when passing callbacks to child components.

```jsx
const handleClick = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### `useImperativeHandle`

Customizes the instance value exposed to parent components when using `ref`.

```jsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { inputRef.current.value = '' },
  }))

  return <input ref={inputRef} />
})

// Parent can call inputRef.current.focus()
```

### `useLayoutEffect`

Like `useEffect` but fires synchronously after all DOM mutations. Use for measuring layout before the browser paints.

```jsx
useLayoutEffect(() => {
  const rect = element.getBoundingClientRect()
  // adjust layout based on measurements
}, [])
```

### `useDebugValue`

Displays a custom label in React DevTools for custom hooks.

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)
  useDebugValue(isOnline ? 'Online' : 'Offline')
  return isOnline
}
```

---

## The Virtual DOM

### What is the Virtual DOM?

The Virtual DOM (VDOM) is a lightweight JavaScript representation of the real DOM. It is a tree of plain objects describing the structure of UI elements. When state changes, React creates a new VDOM tree, diffs it against the previous one, and applies only the minimal necessary updates to the real DOM.

### How It Works

1. **Render**: When state changes, React re-renders the component tree and produces a new VDOM tree.
2. **Diffing**: React compares the new VDOM tree with the previous one using a reconciliation algorithm. It uses heuristics to make this O(n) instead of O(n^3):
   - Elements of different types produce different trees (teardown + rebuild)
   - Elements with the same key across renders are reused (list reconciliation)
   - The `key` prop helps identify which items changed, were added, or removed
3. **Commit**: The minimal set of DOM mutations is flushed to the browser in a batch.

### Why It Matters

- **Performance**: Batches DOM updates and avoids unnecessary reflows/repaints
- **Declarative UI**: You describe *what* the UI should look like, not *how* to update it
- **Cross-platform**: The VDOM abstraction enables React Native and other renderers

### React 19 Improvements

- **Optimized reconciliation**: Fewer re-renders with automatic batching and `useMemo`/`useCallback` improvements
- **Actions**: Async transitions help keep the UI responsive during state updates
- **Better tree diffing**: Improved heuristics for list reconciliation

---

## Common React Interview Questions

### Core Concepts

**Q: What is React?**
React is a JavaScript library for building user interfaces. It uses a component-based architecture, declarative rendering, and the Virtual DOM to efficiently update the UI in response to state changes.

**Q: What is JSX?**
JSX is a syntax extension for JavaScript that looks like HTML. It is compiled to `React.createElement()` calls. JSX allows you to write UI structure alongside logic.

**Q: What is the difference between a controlled and uncontrolled component?**
A controlled component's value is managed by React state — the component renders based on state and changes flow through event handlers. An uncontrolled component stores its own internal DOM state, accessed via `ref`.

```jsx
// Controlled
<input value={state} onChange={e => setState(e.target.value)} />

// Uncontrolled
<input ref={inputRef} defaultValue="initial" />
```

**Q: What is the `key` prop and why is it important?**
`key` helps React identify which items in a list have changed, been added, or removed. Using stable, unique keys (like IDs) prevents unnecessary re-renders and maintains component state across re-orders.

```jsx
{items.map(item => <Item key={item.id} data={item} />)}
```

**Q: What is lifting state up?**
Moving shared state to the closest common ancestor of components that need it. This avoids duplicating state and keeps data flow predictable.

### Hooks

**Q: What are React Hooks?**
Hooks are functions that let you use state, lifecycle, and other React features in functional components. They were introduced in React 16.8.

**Q: What is the Rules of Hooks?**
1. Call hooks at the top level (not inside loops, conditions, or nested functions)
2. Call hooks only from React function components or custom hooks

**Q: `useState` vs `useReducer` — when to use which?**
- `useState` for simple, independent state values (toggles, inputs, counters)
- `useReducer` for complex state logic with multiple sub-values or when the next state depends on the previous state in non-trivial ways

**Q: `useMemo` vs `useCallback`?**
- `useMemo` memoizes a computed *value*
- `useCallback` memoizes a *function* reference (equivalent to `useMemo(() => fn, deps)`)

**Q: When does `useEffect` run?**
1. After the initial render (mount)
2. After every render where dependencies changed
3. The cleanup function runs before the component unmounts and before re-running the effect

**Q: What is the difference between `useEffect` and `useLayoutEffect`?**
`useEffect` runs asynchronously after the browser paints. `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints. Use `useLayoutEffect` when you need to read layout and synchronously re-render.

### React 19

**Q: What is the `use()` hook?**
`use()` reads a promise or context directly inside render. Unlike other hooks, `use()` can be called conditionally and inside loops. When used with a promise, it suspends the component until the promise resolves.

**Q: What are React Actions?**
Actions are async functions passed to `startTransition` or form actions. They enable automatic pending state management, error handling, and optimistic updates.

**Q: What is `useActionState`?**
A hook that manages form state and pending status automatically. It replaces the manual `onSubmit` + `useState` pattern for forms.

**Q: What is `useFormStatus`?**
A hook from `react-dom` that gives child components access to their parent form's pending state, form data, and method without prop drilling.

**Q: What is `useOptimistic`?**
A hook that enables optimistic UI updates — showing the expected result immediately while the async operation completes, then reconciling with the real result.

**Q: What changed with `ref` in React 19?**
`ref` is now a regular prop. You can pass it directly without `forwardRef`. The `forwardRef` wrapper is deprecated but still works.

**Q: What changed with Context in React 19?**
You can now use `<Context>` directly as a provider instead of `<Context.Provider>`.

**Q: Can React 19 render document metadata in components?**
Yes. `<title>`, `<meta>`, `<link>`, and other document head tags can be rendered directly in components. React automatically hoists them to the document `<head>`.

### Performance & Architecture

**Q: How does React's reconciliation algorithm work?**
React compares VDOM trees using a diffing algorithm. Elements of different types cause a full rebuild. Elements of the same type are updated in place. Keys help identify stable list items.

**Q: What is React's event system?**
React uses synthetic events — a cross-browser wrapper around native events. In React 17+, events are delegated to the root node instead of the document.

**Q: What is the difference between Shadow DOM and Virtual DOM?**
Shadow DOM is a browser technology for scoping CSS and DOM subtrees. Virtual DOM is a JavaScript concept for optimizing UI updates. They solve different problems.

**Q: What is React StrictMode?**
A development-only wrapper that intentionally double-invokes renders, effects, and other lifecycle methods to detect side effects and find bugs early.

**Q: What is the difference between `React.memo` and `useMemo`?**
`React.memo` is a higher-order component that prevents re-rendering of a component if its props haven't changed (shallow comparison). `useMemo` is a hook that memoizes a computed value within a component.
