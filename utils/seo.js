export const createSEOMeta = (data) => [
  // HTML Meta Tags
  { hid: 'description', name: 'description', content: data.description },

  // Google / Search Engine Tags
  { hid: 'name', property: 'name', content: data.title },
  { hid: 'image', property: 'image', content: data.image },

  // Facebook metadata tags
  { hid: 'og:title', property: 'og:title', content: data.title },
  {
    hid: 'og:description',
    property: 'og:description',
    content: data.description,
  },
  { hid: 'og:image', property: 'og:image', content: data.image },
  {
    hid: 'og:url',
    property: 'og:url',
    content: data.url,
  },

  // Twitter Meta Tags
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: data.title,
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: data.description,
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: data.image,
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: data.cardType || 'summary_large_image',
  },
  // Others
  (data?.themeColor && {
    hid: 'theme-color',
    name: 'theme-color',
    content: 'black',
  })
]
