export default {
  name: 'studioPage',
  title: 'Studios Page',
  type: 'document',
  fields: [
    {
      title: 'Page Header',
      name: 'heading',
      type: 'blockContentBare',
    },
    {
      title: 'Page Header Intro',
      name: 'headingIntro',
      type: 'text',
    },
    {
      title: 'Page Header hero image',
      name: 'studioHero',
      type: 'image'
    },
    {
      title: 'Studio Booking Widget header',
      name: 'subHeading',
      type: 'blockContent',
    },
  ],
}
