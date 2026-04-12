import {defineField, defineType} from 'sanity'

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'blockContent'}),
    defineField({name: 'th', title: 'Thai', type: 'blockContent'}),
    defineField({name: 'lo', title: 'Lao', type: 'blockContent'}),
  ],
})
