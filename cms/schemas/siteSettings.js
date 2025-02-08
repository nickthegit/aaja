export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'showEmail',
      title: 'Show applications Email',
      type: 'string',
    },
    {
      name: 'telephome',
      title: 'Telephome',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'blockContent',
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
    },
    {
      name: 'soundcloud',
      title: 'Soundcloud',
      type: 'string',
    },
    {
      name: 'mixcloud',
      title: 'Mixcloud Audio',
      type: 'string',
    },
    {
      name: 'mixcloudVideoCh1',
      title: 'Mixcloud Video Ch1',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Link to Mixcloud Video Ch1',
        },
        {
          name: 'enabled',
          title: 'Enable link',
          type: 'boolean',
          description: 'Toggle to enable or disable this link',
        },
        {
          name: 'dynamic',
          title: 'Use Dynamic link?',
          type: 'boolean',
          description:
            'Uses an API to show/hide it (experimental) - only available for Channel 1 for now',
        },
      ],
    },
    {
      name: 'mixcloudVideoCh2',
      title: 'Mixcloud Video Ch2',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          description: 'Link to Mixcloud Video Ch2',
        },
        {
          name: 'enabled',
          title: 'Enable link',
          type: 'boolean',
          description: 'Toggle to enable or disable this link',
        },
      ],
    },
  ],
}
