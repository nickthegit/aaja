const { createSEOMeta } = require('~/utils/seo')

const BASE = {
  title: 'Test Page · Aaja Music',
  description: 'A test description',
  image: 'https://cdn.sanity.io/images/test.jpg',
  url: 'https://aajamusic.com/test',
}

describe('createSEOMeta', () => {
  it('returns an array', () => {
    expect(Array.isArray(createSEOMeta(BASE))).toBe(true)
  })

  it('never contains a falsy entry (no undefined/false hid crash)', () => {
    const meta = createSEOMeta(BASE)
    meta.forEach((entry) => {
      expect(entry).toBeTruthy()
      expect(typeof entry).toBe('object')
      expect(entry.hid).toBeDefined()
    })
  })

  it('works when themeColor is absent (was the SSR crash bug)', () => {
    expect(() => createSEOMeta(BASE)).not.toThrow()
    const meta = createSEOMeta(BASE)
    expect(meta.every(Boolean)).toBe(true)
  })

  it('includes theme-color entry when themeColor is provided', () => {
    const meta = createSEOMeta({ ...BASE, themeColor: 'black' })
    const themeEntry = meta.find((m) => m.hid === 'theme-color')
    expect(themeEntry).toBeDefined()
    expect(themeEntry.content).toBe('black')
  })

  it('does not include theme-color when themeColor is absent', () => {
    const meta = createSEOMeta(BASE)
    const themeEntry = meta.find((m) => m.hid === 'theme-color')
    expect(themeEntry).toBeUndefined()
  })

  it('sets all OG and Twitter tags', () => {
    const meta = createSEOMeta(BASE)
    const hids = meta.map((m) => m.hid)
    expect(hids).toContain('og:title')
    expect(hids).toContain('og:description')
    expect(hids).toContain('og:image')
    expect(hids).toContain('og:url')
    expect(hids).toContain('twitter:title')
    expect(hids).toContain('twitter:description')
    expect(hids).toContain('twitter:image')
    expect(hids).toContain('twitter:card')
  })

  it('uses summary_large_image as default twitter:card', () => {
    const meta = createSEOMeta(BASE)
    const card = meta.find((m) => m.hid === 'twitter:card')
    expect(card.content).toBe('summary_large_image')
  })

  it('allows overriding twitter:card', () => {
    const meta = createSEOMeta({ ...BASE, cardType: 'summary' })
    const card = meta.find((m) => m.hid === 'twitter:card')
    expect(card.content).toBe('summary')
  })
})
