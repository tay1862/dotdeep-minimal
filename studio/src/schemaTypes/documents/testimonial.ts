import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  icon: StarIcon,
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Client Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'company', title: 'Company', type: 'string'}),
    defineField({name: 'quote', title: 'Quote', type: 'localizedString', validation: (r) => r.required()}),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (r) => r.min(1).max(5)}),
    defineField({name: 'order', title: 'Display Order', type: 'number'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'company', media: 'avatar'},
  },
})
