import { useState } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

const steps = [
  {
    title: '1. Render',
    body: 'When state changes, React re-renders the component tree and produces a new Virtual DOM tree — a lightweight JavaScript object representation of the UI.',
  },
  {
    title: '2. Diffing (Reconciliation)',
    body: 'React compares the new VDOM tree with the previous one using a diffing algorithm with O(n) complexity: elements of different types produce different trees (full rebuild), same-type elements are updated in place, and keys help identify stable list items.',
  },
  {
    title: '3. Commit',
    body: 'The minimal set of DOM mutations is flushed to the browser in a batch, avoiding unnecessary reflows and repaints.',
  },
]

const benefits = [
  'Performance — batches DOM updates, avoids unnecessary reflows/repaints',
  'Declarative UI — you describe what the UI should look like, not how to update it',
  'Cross-platform — the VDOM abstraction enables React Native and other renderers',
]

const react19Improvements = [
  'Optimized reconciliation with fewer re-renders via automatic batching',
  'Actions and async transitions keep the UI responsive during state updates',
  'Improved tree diffing heuristics for list reconciliation',
]

export default function VirtualDom() {
  const [activeStep, setActiveStep] = useState(null)

  return (
    <>
      <h2>The Virtual DOM</h2>
      <p className={styles.fileRef}>src/examples/VirtualDom.jsx</p>
      <p className={styles.description}>
        The Virtual DOM (VDOM) is a lightweight JavaScript object tree that mirrors the
        structure of the real DOM. Whenever state changes, React constructs a new VDOM tree,
        compares it against the previous one using a diffing algorithm (reconciliation),
        and computes the most efficient set of DOM mutations to apply. This process avoids
        expensive direct DOM manipulation by batching updates and minimizing reflows.
        The VDOM abstraction also enables cross-platform rendering — React Native uses
        the same VDOM concepts to render native iOS and Android views instead of DOM nodes.
        Understanding reconciliation helps you optimize performance with keys, memoization,
        and component structure.
      </p>

      <h3 className={styles.sectionTitle}>How It Works</h3>

      {steps.map((step) => (
        <div
          key={step.title}
          className={`${styles.stepCard} ${activeStep === step.title ? styles.stepActive : ''}`}
          onClick={() => setActiveStep(activeStep === step.title ? null : step.title)}
        >
          <div className={styles.stepHeader}>
            <span className={styles.stepNumber}>{step.title.split('.')[0]}</span>
            <h4>{step.title}</h4>
            <span className={styles.stepToggle}>{activeStep === step.title ? '−' : '+'}</span>
          </div>
          {activeStep === step.title && (
            <p className={styles.stepBody}>{step.body}</p>
          )}
        </div>
      ))}

      <h3 className={styles.sectionTitle}>Why It Matters</h3>

      <ul className={styles.list}>
        {benefits.map((b) => (
          <li key={b} className={styles.listItem}>{b}</li>
        ))}
      </ul>

      <h3 className={styles.sectionTitle}>React 19 Improvements</h3>

      <ul className={styles.list}>
        {react19Improvements.map((imp) => (
          <li key={imp} className={styles.listItem}>{imp}</li>
        ))}
      </ul>

      <CodeBlock code={`// Simplified VDOM diffing example
function diff(oldVNode, newVNode) {
  if (oldVNode.type !== newVNode.type) {
    // Different types → replace entirely
    return { type: 'REPLACE', newNode: newVNode }
  }

  if (typeof newVNode.type === 'string') {
    // Same HTML element → update attributes & children
    return {
      type: 'UPDATE',
      props: diffProps(oldVNode.props, newVNode.props),
      children: diffChildren(oldVNode.children, newVNode.children),
    }
  }

  // Component → re-render with new props
  return diffComponent(oldVNode, newVNode)
}`} />
    </>
  )
}
