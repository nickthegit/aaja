const { blockToText } = require('~/utils/blockToText')

describe('blockToText', () => {
  it('returns empty string for null/undefined input', () => {
    expect(blockToText(null)).toBe('')
    expect(blockToText(undefined)).toBe('')
    expect(blockToText([])).toBe('')
  })

  it('extracts text from a single block', () => {
    const blocks = [
      { _type: 'block', children: [{ text: 'Hello world' }] },
    ]
    expect(blockToText(blocks)).toBe('Hello world')
  })

  it('joins multiple children within a block', () => {
    const blocks = [
      { _type: 'block', children: [{ text: 'Hello' }, { text: ' world' }] },
    ]
    expect(blockToText(blocks)).toBe('Hello world')
  })

  it('joins multiple blocks with a space', () => {
    const blocks = [
      { _type: 'block', children: [{ text: 'First.' }] },
      { _type: 'block', children: [{ text: 'Second.' }] },
    ]
    expect(blockToText(blocks)).toBe('First. Second.')
  })

  it('ignores non-block types like images', () => {
    const blocks = [
      { _type: 'block', children: [{ text: 'Text here' }] },
      { _type: 'image', asset: { _ref: 'image-abc' } },
    ]
    expect(blockToText(blocks)).toBe('Text here')
  })

  it('truncates to 160 characters by default', () => {
    const longText = 'a'.repeat(200)
    const blocks = [{ _type: 'block', children: [{ text: longText }] }]
    expect(blockToText(blocks)).toHaveLength(160)
  })

  it('respects custom maxLength', () => {
    const blocks = [{ _type: 'block', children: [{ text: 'Hello world' }] }]
    expect(blockToText(blocks, 5)).toBe('Hello')
  })

  it('handles children with no text property', () => {
    const blocks = [
      { _type: 'block', children: [{ _type: 'span' }, { text: 'visible' }] },
    ]
    expect(blockToText(blocks)).toBe('visible')
  })
})
