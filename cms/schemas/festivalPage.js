export default {
  name: 'festivalPage',
  title: 'Festival Page',
  type: 'document',
  fields: [
    {
      title: 'Page Header',
      name: 'heading',
      type: 'blockContentBare',
    },
    {
      title: 'Page Header Intro',
      name: 'headingIntro',
      type: 'text',
    },
    {
      title: 'Page Header hero image',
      name: 'festivalHero',
      type: 'image'
    },
    {
      title: 'Festival Images header',
      name: 'subHeading',
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
