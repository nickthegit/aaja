import { RiCalendarTodoFill } from "react-icons/ri";

export default {
  name: 'liveEvents',
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
      name: 'eventDateText',
      title: 'Event Date & time (with end time)',
      description: "IMPORTANT: If adding a time, remember to add a @ between the event date & time like in this format: like so: 8 March 2024 @ 14:00-20:00",
      type: 'string',
      validation: (Rule => Rule.regex(/@/).error('If adding an event time, a @ must be added between the date and time like so for example: 8 March 2024 @ 14:00-20:00'))
    },
    {
      name: 'eventLocation',
      title: 'Event Location',
      type: 'string',
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
      type: 'blockContent',
    },
    {
      name: 'backgroundColor',
      title: 'Header Background color',
      type: 'string',
      description: 'colors there: https://www.w3.org/wiki/CSS/Properties/color/keywords - its usually 1 word, i.e. blue',
    },
    {
      name: 'textColor',
      title: 'Header Text color',
      type: 'string',
      description: 'colors there: https://www.w3.org/wiki/CSS/Properties/color/keywords - its usually 1 word, i.e. blue',
    },
    {
      name: 'feature_image',
      title: 'Event Image',
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
      name: "ctaTitle",
      title: 'Event Link Button Title',
      type: 'string',
    },
    {
      name: 'eventLink',
      title: 'Event Link',
      type: 'string',
      description: 'eg. https://ra.com/event/1531',
    },
    {
      name: "ctaAudioTitle",
      title: 'Audio Link Button Title',
      type: 'string',
    },
    {
      name: 'audioStreamingLink',
      title: 'Audio Streaming Link',
      type: 'string',
      description: 'Experimental, might not work. eg. https://aaja2.out.airtime.pro/aaja2_a',
    },
    {
      name: 'iframeLink',
      title: 'Iframe Link',
      type: 'string',
      description: 'Experimental, might not work. eg. i.e. https://www.youtube.com/embed/jfKfPfyJRdk?si=bXEUfWEKM3pzDjdq&controls=0',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'feature_image',
    },
  },
}
