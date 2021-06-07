export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title Text',
      type: 'text',
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'blockContent',
    },
    {
      name: 'feature_image',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'feature_image',
    },
  },
}
