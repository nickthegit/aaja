const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, '../../dist')

function readPage(route) {
  const file = path.join(distDir, route, 'index.html')
  if (!fs.existsSync(file)) {
    throw new Error(`Generated page not found: ${file} — run 'nuxt generate' first`)
  }
  return fs.readFileSync(file, 'utf-8')
}

function getMeta(html, hid) {
  const match = html.match(new RegExp(`data-hid="${hid}"[^>]*content="([^"]*)"`, 'i'))
    || html.match(new RegExp(`hid="${hid}"[^>]*content="([^"]*)"`, 'i'))
  return match ? match[1] : null
}

function getTitle(html) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/)
  return match ? match[1] : null
}

describe('Generated HTML — SSR meta tags', () => {
  const pages = [
    { route: '', label: 'home', expectedTitle: /Aaja Music/, expectedOgTitle: /Aaja Music/ },
    { route: 'festival', label: 'festival', expectedTitle: /Creekside Festival/i, expectedOgTitle: /Creekside Festival/i },
    { route: 'radio', label: 'radio', expectedTitle: /Radio/i, expectedOgTitle: /Radio/i },
    { route: 'bar', label: 'bar', expectedTitle: /Bar/i, expectedOgTitle: /Bar/i },
    { route: 'about', label: 'about', expectedTitle: /Aaja/i, expectedOgTitle: /Aaja/i },
    { route: 'label', label: 'label', expectedTitle: /Label/i, expectedOgTitle: /Label/i },
    { route: 'live-events', label: 'live-events', expectedTitle: /Events/i, expectedOgTitle: /Events/i },
    { route: 'channel-2', label: 'channel-2', expectedTitle: /Channel 2/i, expectedOgTitle: /Channel 2/i },
  ]

  beforeAll(() => {
    if (!fs.existsSync(distDir)) {
      throw new Error(`dist/ not found — run 'yarn generate' before running integration tests`)
    }
  })

  pages.forEach(({ route, label, expectedTitle, expectedOgTitle }) => {
    describe(label, () => {
      let html
      beforeAll(() => { html = readPage(route) })

      it('has data-n-head="ssr" (server-rendered head)', () => {
        expect(html).toContain('data-n-head="ssr"')
      })

      it('has a non-generic <title>', () => {
        expect(getTitle(html)).toMatch(expectedTitle)
      })

      it('has og:title matching page', () => {
        expect(getMeta(html, 'og:title')).toMatch(expectedOgTitle)
      })

      it('has og:description set', () => {
        const desc = getMeta(html, 'og:description')
        expect(desc).toBeTruthy()
        expect(desc.length).toBeGreaterThan(10)
      })

      it('has twitter:card set', () => {
        expect(getMeta(html, 'twitter:card')).toBeTruthy()
      })
    })
  })

  describe('resident page (dynamic route)', () => {
    const slug = 'pappafunk'
    let html
    beforeAll(() => { html = readPage(`residents/${slug}`) })

    it('has data-n-head="ssr"', () => {
      expect(html).toContain('data-n-head="ssr"')
    })

    it('has resident name in og:title', () => {
      expect(getMeta(html, 'og:title')).toMatch(/Pappafunk/i)
    })

    it('has a non-empty og:description', () => {
      const desc = getMeta(html, 'og:description')
      expect(desc).toBeTruthy()
    })

    it('has og:image pointing to Sanity CDN', () => {
      const img = getMeta(html, 'og:image')
      expect(img).toMatch(/cdn\.sanity\.io/)
    })
  })

  describe('no RadioCult API calls baked into static HTML', () => {
    it('festival page does not contain radiocult API responses', () => {
      const html = readPage('festival')
      expect(html).not.toContain('radiocult.fm/api')
    })

    it('home page does not contain radiocult API responses', () => {
      const html = readPage('')
      expect(html).not.toContain('radiocult.fm/api')
    })
  })
})
