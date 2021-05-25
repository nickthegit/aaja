export default {
  name: 'resident',
  title: 'Resident',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
    },
    {
      name: 'short_bio',
      title: 'Short Bio',
      type: 'text',
    },
    {
      title: 'Slot',
      name: 'slot',
      type: 'string',
      description:
        'Describe a regular slot - e.g. "First Tuesday of every month - 8-10pm"',
    },
    {
      title: 'Website',
      name: 'website',
      type: 'string',
    },
    {
      title: 'Mixcloud url',
      name: 'mixcloud_url',
      type: 'string',
      description:
        'To show latest playlists - e.g. should look like this: https://www.mixcloud.com/theyesness/',
    },
    {
      title: 'Socials',
      name: 'socials',
      type: 'object',
      fields: [
        { title: 'Instagram', name: 'instagram', type: 'string' },
        { title: 'Twitter', name: 'twitter', type: 'string' },
        { title: 'Facebook', name: 'facebook', type: 'string' },
      ],
    },
    {
      name: 'spotlight_image',
      title: 'Spotlight Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Image which will be used when resident is in the spotlight on the radio page.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'feature_image',
    },
  },
}
