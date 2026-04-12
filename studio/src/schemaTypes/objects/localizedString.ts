import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'string'}),
    defineField({name: 'th', title: 'Thai', type: 'string'}),
    defineField({name: 'lo', title: 'Lao', type: 'string'}),
  ],
})
