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
      title: 'Page Header hero image',
      name: 'festivalHero',
      type: 'image',
    },
    {
      title: 'Page Header Intro',
      name: 'headingIntro',
      type: 'text',
    },
    {
      title: 'Festival Images header',
      name: 'subHeading',
      hidden: true, // hiding so we use the new years selector, was only for 2023, cba doing the photos migration
      type: 'text',
      rows: 4,
    },
    {
      name: 'years',
      type: 'array',
      title: 'Festival Years',
      of: [
        {
          type: 'object',
          title: 'Year',
          fields: [
            {
              name: 'year',
              type: 'number',
              title: 'Year',
              validation: (Rule) => Rule.required().integer().min(2000).max(2100),
            },
            {
              name: 'headerText',
              type: 'string',
              title: 'Header Text',
              description: 'Brief header text for this year.',
            },
            {
              name: 'media',
              type: 'array',
              title: 'Media',
              description: 'Add photos or videos for this year.',
              of: [
                {
                  type: 'image',
                  title: 'Photo',
                  options: {
                    hotspot: true, // Enables image cropping
                  },
                },
                {
                  type: 'file',
                  title: 'Video',
                  options: {
                    accept: 'video/*',
                  },
                },
              ],
            },
          ],

          preview: {
            select: {
              title: 'year',
            },
          },
        },
      ],
    },
    {
      title: 'Images',
      description: 'Drag and drop images from folder to add several at once.',
      name: 'images',
      hidden: true, // hiding so we use the new years selector, was only for 2023, cba doing the photos migration
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'altText',
              type: 'string',
              title: 'Alt Text',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
      // validation: (Rule) => Rule.min(3).max(3),
    },
  ],
}
