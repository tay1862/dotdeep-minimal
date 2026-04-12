import {defineField, defineType} from 'sanity'
import {CreditCardIcon} from '@sanity/icons'

export const pricingItem = defineType({
  name: 'pricingItem',
  title: 'Pricing Item',
  icon: CreditCardIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in base currency',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          {title: 'LAK (₭)', value: 'LAK'},
          {title: 'USD ($)', value: 'USD'},
          {title: 'THB (฿)', value: 'THB'},
        ],
      },
      initialValue: 'LAK',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'features',
      title: 'Included Features',
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
    select: {title: 'name.en', price: 'price', currency: 'currency'},
    prepare({title, price, currency}) {
      return {
        title: title || 'Untitled',
        subtitle: price ? `${currency} ${price.toLocaleString()}` : 'No price set',
      }
    },
  },
})
