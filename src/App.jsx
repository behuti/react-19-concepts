import { useState } from 'react'
import UseHook from './examples/UseHook'
import UseTransitionDemo from './examples/UseTransitionDemo'
import UseActionStateDemo from './examples/UseActionStateDemo'
import UseFormStatusDemo from './examples/UseFormStatusDemo'
import UseOptimisticDemo from './examples/UseOptimisticDemo'
import RefAsProp from './examples/RefAsProp'
import ContextDirect from './examples/ContextDirect'
import DocumentMetadata from './examples/DocumentMetadata'
import ClassicHooks from './examples/ClassicHooks'
import VirtualDom from './examples/VirtualDom'
import InterviewQs from './examples/InterviewQs'
import styles from './styles/App.module.scss'

const features = [
  {
    id: 'use',
    label: 'use() Hook',
    tag: 'Hook',
    tagClass: 'tagHook',
    desc: 'Read promises & context directly in render',
    file: 'src/examples/UseHook.jsx',
  },
  {
    id: 'transition',
    label: 'useTransition + Actions',
    tag: 'API',
    tagClass: 'tagApi',
    desc: 'Async transitions & server actions',
    file: 'src/examples/UseTransitionDemo.jsx',
  },
  {
    id: 'action-state',
    label: 'useActionState',
    tag: 'Hook',
    tagClass: 'tagHook',
    desc: 'Form actions with automatic state',
    file: 'src/examples/UseActionStateDemo.jsx',
  },
  {
    id: 'form-status',
    label: 'useFormStatus',
    tag: 'Hook',
    tagClass: 'tagHook',
    desc: 'Read form submission status',
    file: 'src/examples/UseFormStatusDemo.jsx',
  },
  {
    id: 'optimistic',
    label: 'useOptimistic',
    tag: 'Hook',
    tagClass: 'tagHook',
    desc: 'Optimistic UI updates',
    file: 'src/examples/UseOptimisticDemo.jsx',
  },
  {
    id: 'ref-prop',
    label: 'ref as Prop',
    tag: 'JSX',
    tagClass: 'tagJsx',
    desc: 'No more forwardRef needed',
    file: 'src/examples/RefAsProp.jsx',
  },
  {
    id: 'context',
    label: 'Context as Provider',
    tag: 'JSX',
    tagClass: 'tagJsx',
    desc: '<Context> directly instead of <Context.Provider>',
    file: 'src/examples/ContextDirect.jsx',
  },
  {
    id: 'metadata',
    label: 'Document Metadata',
    tag: 'API',
    tagClass: 'tagApi',
    desc: 'title, meta tags inside components',
    file: 'src/examples/DocumentMetadata.jsx',
  },
  {
    id: 'classic-hooks',
    label: 'Classic Hooks',
    tag: 'Guide',
    tagClass: 'tagGuide',
    desc: 'useState, useEffect, useRef, and more',
    file: 'src/examples/ClassicHooks.jsx',
  },
  {
    id: 'vdom',
    label: 'Virtual DOM',
    tag: 'Guide',
    tagClass: 'tagGuide',
    desc: 'How React\'s reconciliation works',
    file: 'src/examples/VirtualDom.jsx',
  },
  {
    id: 'interview-qs',
    label: 'Interview Q&A',
    tag: 'Guide',
    tagClass: 'tagGuide',
    desc: 'Common React interview questions',
    file: 'src/examples/InterviewQs.jsx',
  },
]

const components = {
  use: UseHook,
  transition: UseTransitionDemo,
  'action-state': UseActionStateDemo,
  'form-status': UseFormStatusDemo,
  optimistic: UseOptimisticDemo,
  'ref-prop': RefAsProp,
  context: ContextDirect,
  metadata: DocumentMetadata,
  'classic-hooks': ClassicHooks,
  vdom: VirtualDom,
  'interview-qs': InterviewQs,
}

export default function App() {
  const [active, setActive] = useState(null)
  const ActiveComponent = active ? components[active] : null

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>React 19 Concepts</h1>
        <p>Interactive guide to the latest React 19 features and hooks</p>
      </header>

      <div className={styles.featureGrid}>
        {features.map((f) => (
          <div
            key={f.id}
            className={`${styles.featureCard} ${active === f.id ? styles.active : ''}`}
            onClick={() => setActive(active === f.id ? null : f.id)}
          >
            <span className={`${styles.featureTag} ${styles[f.tagClass]}`}>{f.tag}</span>
            <h3>{f.label}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      {ActiveComponent && (
        <div className={styles.demoPanel}>
          <ActiveComponent />
        </div>
      )}

      {!ActiveComponent && (
        <div className={styles.emptyState}>
          Click any card above to see the demo and explanation
        </div>
      )}
    </div>
  )
}
