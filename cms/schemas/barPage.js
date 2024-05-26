export default {
  name: 'barPage',
  title: 'Bar Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'blockContentBare',
    },
    {
      name: 'heroImage',
      title: 'Bar header image',
      type: 'image'
    },
    {
      name: 'opening',
      title: 'Opening Hours',
      type: 'blockContent',
    },
    {
      name: 'booking',
      title: 'Booking URL',
      type: 'string',
    },
    {
      name: 'menu',
      title: 'Menu PDF',
      type: 'file',
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // <-- Defaults to false
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: 'altText',
              type: 'string',
              title: 'Alt Text',
              options: {
                isHighlighted: true, // <-- make this field easily accessible
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(3).max(3),
    },
  ],
}
