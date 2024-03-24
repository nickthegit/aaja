export default {
  name: 'liveEventsLandingPage',
  title: 'Live Events Landing Page',
  type: 'document',
  fields: [
    {
      title: 'Header content',
      name: 'heading',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      title: 'Header Intro',
      name: 'headingIntro',
      type: 'text',
    },
    {
      name: 'feature_image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ]
    },
    {
      title: 'Text area above event list',
      name: 'intro',
      type: 'array',
      of: [{ type: 'block' }]
    },

  ],
}
