export default {
  name: 'studioPage',
  title: 'Studio Page',
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
      type: 'blockContent',
    },
    {
      name: 'booking',
      title: 'Booking URL',
      type: 'string',
    },
    {
      title: 'Page Header hero image',
      name: 'studioHero',
      type: 'image'
    },
    {
      title: 'Studio Bookings header',
      name: 'subHeading',
      type: 'blockContent',
    },
    {
      title: 'Studio Images',
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
