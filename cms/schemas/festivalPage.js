export default {
  name: 'festivalPage',
  title: 'Festival Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'blockContentBare',
    },
    {
      name: 'subHeading',
      title: 'Festival page Sub Heading',
      type: 'text',
      rows: 4,
    },
    {
      title: 'Images',
      description: 'Drag and drop images from folder to add several at once.',
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
      // validation: (Rule) => Rule.min(3).max(3),
    },
  ],
}
