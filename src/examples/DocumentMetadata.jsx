import { useState } from 'react'
import styles from '../styles/examples.module.scss'
import CodeBlock from '../components/CodeBlock'

export default function DocumentMetadata() {
  const [section, setSection] = useState('home')

  const meta = {
    home: { title: 'React 19 Concepts — Home', description: 'Learn React 19 hooks and features' },
    about: { title: 'About — React 19 Concepts', description: 'About this interactive guide to React 19' },
    contact: { title: 'Contact — React 19 Concepts', description: 'Get in touch about React 19' },
  }

  const current = meta[section]

  return (
    <>
      <title>{current.title}</title>
      <meta name="description" content={current.description} />

      <h2>Document Metadata</h2>
      <p className={styles.fileRef}>src/examples/DocumentMetadata.jsx</p>
      <p className={styles.description}>
        React 19 adds built-in support for document head elements — <code>{'<title>'}</code>,
        <code>{'<meta>'}</code>, <code>{'<link>'}</code>, and <code>{'<script>'}</code> —
        rendered directly inside your components without any library like <code>react-helmet</code>.
        React automatically hoists these elements to the document <code>{'<head>'}</code>
        and deduplicates them based on their tag name and attributes. This means you can set
        page titles, meta descriptions, canonical links, and other SEO-critical tags
        declaratively within your component tree. The tags update reactively when props
        change and clean up when the component unmounts. This is a game-changer for SSR
        and SEO without extra dependencies.
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['home', 'about', 'contact'].map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{ background: section === s ? 'var(--accent)' : 'var(--surface)' }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.metaDemo}>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Check the browser tab title ^
        </p>
      </div>

      <CodeBlock code={`function Page() {
  return (
    <>
      <title>My Page</title>
      <meta name="description"
            content="Page description" />
      <link rel="canonical"
            href="https://..." />
      <h1>My Page</h1>
    </>
  )
}

// React hoists these to <head> automatically`} />
    </>
  )
}
