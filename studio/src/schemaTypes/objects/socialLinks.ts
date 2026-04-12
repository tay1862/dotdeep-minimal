import {defineField, defineType} from 'sanity'

export const socialLinks = defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  fields: [
    defineField({name: 'whatsapp', title: 'WhatsApp', type: 'string', description: 'Phone number with country code (e.g. +85620...)'}),
    defineField({name: 'line', title: 'LINE', type: 'string', description: 'LINE Official ID or URL'}),
    defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
    defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
    defineField({name: 'tiktok', title: 'TikTok', type: 'url'}),
    defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
  ],
})
