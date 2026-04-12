import {defineField, defineType} from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', description: 'e.g. "50"', validation: (r) => r.required()}),
    defineField({name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g. "+"'}),
    defineField({name: 'label', title: 'Label', type: 'localizedString', validation: (r) => r.required()}),
  ],
  preview: {
    select: {value: 'value', suffix: 'suffix', label: 'label.en'},
    prepare({value, suffix, label}) {
      return {title: `${value}${suffix || ''} — ${label || ''}`}
    },
  },
})
