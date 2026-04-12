import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  icon: ImageIcon,
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Client Name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (r) => r.required(),
    }),
    defineField({name: 'url', title: 'Website URL', type: 'url'}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', media: 'logo'},
  },
})
