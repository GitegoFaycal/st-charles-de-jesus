export function formatDate(value, opts = {}) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', ...opts })
}

export function formatMoney(n) {
  if (n === null || n === undefined || n === '') return '—'
  const num = Number(n)
  if (Number.isNaN(num)) return n
  if (num === 0) return '—'
  return `${num.toLocaleString('en-US')} RWF`
}

export function sortByOrder(list = []) {
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export function sortByDateDesc(list = []) {
  return [...list].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
}

export function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}
