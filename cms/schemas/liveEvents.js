import { RiCalendarTodoFill } from "react-icons/ri";

export default {
  name: 'live-events',
  title: 'Live Events',
  icon: RiCalendarTodoFill,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'eventDateTime',
      title: 'Event Date',
      type: 'datetime',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click generate so it picks it up from the event name or you can just use a custom one as long as its all lowercase and it has a dash character in between words (i.e xav-on-a-bike)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule => Rule.required())
    },
    {
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
    },
    {
      name: 'feature_image',
      title: 'Feature Image (the bigger the better as its a splash, always compress before uploading though)',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ]
    },
    {
      name: 'audioLink',
      title: 'Audio Link',
      type: 'string',
      description: 'eg. https://aaja2.out.airtime.pro/aaja2_a',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'feature_image',
    },
  },
}
