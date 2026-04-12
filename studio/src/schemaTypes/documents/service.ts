import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  icon: BulbOutlineIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.en', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localizedString',
      description: 'Brief tagline shown on the services listing page',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'localizedBlockContent',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g. "palette", "code", "layout")',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'localizedString'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title.en', subtitle: 'shortDescription.en'},
    prepare({title, subtitle}) {
      return {title: title || 'Untitled Service', subtitle}
    },
  },
})
