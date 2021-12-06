export default {
  name: 'radioPage',
  title: 'Radio Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'blockContentBare',
    },
    {
      name: 'subHeading',
      title: 'Radio Page Sub Heading',
      type: 'text',
      rows: 2,
    },
    {
      name: 'spotlightHeading',
      title: 'Spotlight Section Heading',
      type: 'text',
      rows: 1,
    },
    {
      name: 'spotlightSubHeading',
      title: 'Spotlight Section Sub Heading',
      type: 'text',
      rows: 2,
    },
    {
      name: 'spotlight',
      title: 'Spotlight',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resident' }],
        },
      ],
      validation: (Rule) => Rule.unique().max(20),
    },
    {
      name: 'communityHeading',
      title: 'Community Section Heading',
      type: 'text',
      rows: 1,
    },
    {
      name: 'communityTitle',
      title: 'Community Section Title',
      type: 'text',
      rows: 1,
    },
    {
      name: 'communityText',
      title: 'Community Section Text',
      type: 'blockContent',
    },
    {
      name: 'community',
      title: 'Aaja Community',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'resident' }],
        },
      ],
      validation: (Rule) => Rule.unique().max(6),
    },
  ],
}
