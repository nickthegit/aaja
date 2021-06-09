import { SiDiscogs } from 'react-icons/si'

export default {
  name: 'ep',
  title: 'EP',
  icon: SiDiscogs,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'eg AAJA001',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'feature_image',
      title: 'Feature Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'link',
      title: 'Link to Mixcloud URL',
      type: 'string',
      description:
        'Should look like this https://www.mixcloud.com/AAJAdeptford/earnshaw-mellow-music-episode-004/',
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
