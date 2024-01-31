export default {
  name: 'liveEventsLandingPage',
  title: 'Live Events Landing Page',
  type: 'document',
  fields: [
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'blockContent',
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
  ],
}
