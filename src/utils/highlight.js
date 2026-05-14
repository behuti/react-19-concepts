const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'import', 'export', 'default',
  'from', 'if', 'else', 'for', 'while', 'async', 'await', 'new', 'try',
  'catch', 'throw', 'class', 'extends', 'true', 'false', 'null', 'undefined',
  'typeof', 'instanceof', 'this', 'switch', 'case', 'break', 'continue',
  'do', 'yield', 'in', 'of', 'type', 'interface',
])

const COLORS = {
  keyword: '#ff79c6',
  string: '#f1fa8c',
  number: '#bd93f9',
  function: '#50fa7b',
  comment: '#6272a4',
  jsx: '#8be9fd',
  builtin: '#8be9fd',
}

function tokenize(code) {
  const tokens = []
  let remaining = code

  while (remaining.length > 0) {
    let matched = false

    const comment1 = remaining.match(/^\/\/.*/)
    if (comment1) {
      tokens.push({ type: 'comment', value: comment1[0] })
      remaining = remaining.slice(comment1[0].length); continue
    }

    const comment2 = remaining.match(/^\/\*[\s\S]*?\*\//)
    if (comment2) {
      tokens.push({ type: 'comment', value: comment2[0] })
      remaining = remaining.slice(comment2[0].length); continue
    }

    const tmpl = remaining.match(/^`(?:[^`\\]|\\.)*`/)
    if (tmpl) {
      tokens.push({ type: 'string', value: tmpl[0] })
      remaining = remaining.slice(tmpl[0].length); continue
    }

    const sq = remaining.match(/^'(?:[^'\\]|\\.)*'/)
    if (sq) {
      tokens.push({ type: 'string', value: sq[0] })
      remaining = remaining.slice(sq[0].length); continue
    }

    const dq = remaining.match(/^"(?:[^"\\]|\\.)*"/)
    if (dq) {
      tokens.push({ type: 'string', value: dq[0] })
      remaining = remaining.slice(dq[0].length); continue
    }

    const num = remaining.match(/^\b\d+\.?\d*\b/)
    if (num) {
      tokens.push({ type: 'number', value: num[0] })
      remaining = remaining.slice(num[0].length); continue
    }

    const word = remaining.match(/^[a-zA-Z_$][\w$]*/)
    if (word) {
      const w = word[0]
      if (KEYWORDS.has(w)) {
        tokens.push({ type: 'keyword', value: w })
      } else if (w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase()) {
        tokens.push({ type: 'jsx', value: w })
      } else if (remaining.slice(w.length).match(/^\s*\(/)) {
        tokens.push({ type: 'function', value: w })
      } else {
        tokens.push({ type: 'plain', value: w })
      }
      remaining = remaining.slice(w.length); continue
    }

    if (remaining[0] === '<') {
      const tag = remaining.match(/^<\/?[a-zA-Z][\w]*(\s[^>]*?)?\/?>/)
      if (tag) {
        tokens.push({ type: 'jsx', value: tag[0] })
        remaining = remaining.slice(tag[0].length); continue
      }
    }

    tokens.push({ type: 'plain', value: remaining[0] })
    remaining = remaining.slice(1)
  }

  return tokens
}

export function highlightToHtml(code) {
  const tokens = tokenize(code)
  return tokens.map((t) => {
    const esc = t.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    if (t.type === 'plain') return esc
    return `<span style="color:${COLORS[t.type]}">${esc}</span>`
  }).join('')
}
