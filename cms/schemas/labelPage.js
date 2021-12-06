export default {
  name: 'labelPage',
  title: 'Label Page',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Page Heading',
      type: 'blockContentBare',
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
    },
    {
      name: 'eps',
      title: 'Eps',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'ep' }],
        },
      ],
      validation: (Rule) => Rule.unique().min(1),
    },
  ],
}
