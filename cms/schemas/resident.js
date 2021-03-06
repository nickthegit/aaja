import { RiHeadphoneLine } from 'react-icons/ri'

export default {
  name: 'resident',
  title: 'Resident',
  icon: RiHeadphoneLine,
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
      hidden: true,
    },
    {
      name: 'bioText',
      title: 'Bio',
      type: 'blockContent',
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
      description: 'Describe a regular slot - e.g. "First Tuesday of every month - 8-10pm"',
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
      title: 'Soundcloud url',
      name: 'soundcloud_url',
      type: 'string',
      description:
        'To show latest playlists - e.g. should look like this: https://soundcloud.com/theyesness',
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
      description: 'Image which will be used when resident is in the spotlight on the radio page.',
    },
    {
      title: 'Soundcloud Playlist Embed',
      name: 'soundcloud_embed',
      type: 'string',
      description:
        'The embed code provided by soundcloud, hit "share" on the playlist in soundcloud, then navigate to "Embed", then copy the iframe code which looks like this: <iframe width="100%" height="300" scrolling="no" framebo... Then paste it here.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'feature_image',
    },
  },
}
