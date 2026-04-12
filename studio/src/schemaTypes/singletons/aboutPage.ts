import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'storyImage',
      title: 'Story Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'techStack',
      title: 'Technologies & Skills',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'name', title: 'Name', type: 'string'}),
          defineField({name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g. "react", "figma", "nextjs"'}),
        ],
        preview: {
          select: {title: 'name'},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
