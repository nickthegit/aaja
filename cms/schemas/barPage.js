export default {
  name: 'barPage',
  title: 'Bar Page',
  type: 'document',
  fields: [
    {
      name: 'opening',
      title: 'Opening Hours',
      type: 'text',
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
