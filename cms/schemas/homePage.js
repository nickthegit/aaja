export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      title: 'Home News Banner',
      name: 'homeNewsBanner',
      type: 'array',
      of: [
        {
          title: 'News Item',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Date',
              name: 'date',
              type: 'date',
              options: {
                dateFormat: 'DD/MM/YY',
              },
            },
            {
              name: 'feature_image',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              description:
                'Main image for desktop & tablet: Ratio needs to be 2:1. A good example would be an image of 2560x1280px.',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'feature_image_mobile',
              title: 'Feature Image Mobile',
              type: 'image',
              options: {
                hotspot: true,
              },
              description:
                'Main image for Mobile: Ratio needs to be 1:1. A good example would be an image of 800x800px.',
            },
            {
              name: 'content',
              title: 'Content Text',
              type: 'blockContent',
            },
          ],
        },
      ],
    },
  ],
}
