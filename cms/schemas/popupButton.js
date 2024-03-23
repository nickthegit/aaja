export default {
  name: 'popupButton',
  title: 'Popup Button',
  type: 'document',
  fields: [
    {
      name: 'isEnabled',
      title: 'Enable button',
      type: 'boolean'
    },
    {
      name: 'shouldShake',
      title: 'Add Shake Animation when idle',
      type: 'boolean',
      hidden: ({ document }) => !document?.isEnabled
    },
    {
      name: 'shouldSpin',
      title: 'Add Spin Animation on hover',
      type: 'boolean',
      hidden: ({ document }) => !document?.isEnabled
    },
    {
      name: 'shouldBlendWithBackground',
      title: 'Add Contrast on Background color',
      description:'For example, a black logo on black background becomes white',
      type: 'boolean',
      hidden: ({ document }) => !document?.isEnabled
    },
    {
      name: 'shouldPopup',
      type: 'boolean',
      title: 'Should popup in new window',
      description: 'If disabled, the default will be to open the link in a new tab rather than window popup',
      hidden: ({ document }) => !document?.isEnabled
    },
    {
      title: 'Popup Dimension Width',
      name: 'popupWidth',
      type: 'number',
      validation: (Rule) => Rule.min(1),
      hidden: ({ document }) => !(document?.isEnabled && document?.shouldPopup)
    },
    {
      title: 'Popup Dimension Height',
      name: 'popupHeight',
      type: 'number',
      validation: (Rule) => Rule.min(1),
      hidden: ({ document }) => !(document?.isEnabled && document?.shouldPopup)
    },
    {
      name: 'buttonLink',
      title: 'Link',
      type: 'text',
      description: 'eg. https://ra.com/event/1531',
      hidden: ({ document }) => !document?.isEnabled
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Make sure to upload a circled image with transparent background (can be a .svg file).',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => !document?.isEnabled
    }
  ],
}
