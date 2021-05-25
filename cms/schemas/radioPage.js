export default {
  name: 'radioPage',
  title: 'Radio Page',
  type: 'document',
  fields: [
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
