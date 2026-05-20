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
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Ordered list of links shown in the slide-out menu.',
      of: [
        {
          type: 'object',
          validation: Rule => Rule.custom(fields => {
            const slug = fields.slug?.trim()
            if (!slug && !fields.externalLink) {
              return 'Provide either an internal path or an external URL.'
            }
            if (slug && fields.externalLink) {
              return 'Set either an internal path or an external URL, not both.'
            }
            return true
          }),
          fields: [
            {
              name: 'name',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'slug',
              title: 'Internal path',
              type: 'string',
              description: 'e.g. "radio" or "live-events". No leading slash. Leave blank if using an external link.',
              validation: Rule => Rule.custom(val => {
                if (!val) return true
                const trimmed = val.trim()
                if (!trimmed) return 'Path cannot be blank or whitespace only.'
                if (trimmed.startsWith('/')) return 'Do not include a leading slash — it is added automatically.'
                return true
              }),
            },
            {
              name: 'externalLink',
              title: 'External URL',
              type: 'url',
              description: 'Full URL for external links. Leave blank for internal routes.',
            },
            {
              name: 'openInNewTab',
              title: 'Open in new tab',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'slug' },
          },
        },
      ],
    },
  ],
}
