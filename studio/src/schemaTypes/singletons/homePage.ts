import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Link',
      type: 'string',
      description: 'e.g. "/gallery" or "/contact"',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true

          return /^\/(?!\/)/.test(value)
            ? true
            : 'Use a relative path that starts with a single slash, for example /gallery'
        }),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{type: 'stat'}],
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Section Heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Section Heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Section Text',
      type: 'localizedString',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
