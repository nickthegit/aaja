export const blockToText = (blocks = [], maxLength = 160) =>
  (blocks || [])
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text || '').join(''))
    .join(' ')
    .trim()
    .slice(0, maxLength)
