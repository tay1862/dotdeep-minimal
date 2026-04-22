/**
 * Seed script for DotDeep Design site settings
 * Run with: npx sanity exec scripts/seed-settings.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const siteSettings = {
  _id: 'siteSettings',
  _type: 'settings',
  title: 'DotDeep Design',
  description: [
    {
      _type: 'block',
      _key: 'desc1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span1',
          text: 'Crafting digital experiences from Laos to the world. We specialize in graphic design, web development, UI/UX design, and video production.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  // Contact information - UPDATE THESE WITH YOUR REAL INFO
  contactEmail: 'hello@dotdeep.com',
  contactPhone: '+856 20 1234 5678',
  address: {
    _type: 'localizedString',
    en: 'Vientiane, Laos',
    th: 'เวียงจันทน์, ลาว',
    lo: 'ວຽງຈັນ, ລາວ',
  },
  // Social links - UPDATE THESE WITH YOUR REAL ACCOUNTS
  socialLinks: {
    _type: 'socialLinks',
    facebook: 'https://facebook.com/dotdeep',
    instagram: 'https://instagram.com/dotdeep',
    tiktok: 'https://tiktok.com/@dotdeep',
    whatsapp: '8562012345678', // Phone number without + or spaces
    line: '@dotdeep', // LINE ID with @
    linkedin: 'https://linkedin.com/company/dotdeep',
  },
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=...',
}

async function seedSettings() {
  console.log('🌱 Seeding site settings...')

  try {
    const result = await client.createOrReplace(siteSettings)
    console.log('✅ Site settings created/updated:', result._id)
    console.log('\n📝 Remember to update the following in Sanity Studio:')
    console.log('   - Contact email')
    console.log('   - Contact phone')
    console.log('   - Social media links')
    console.log('   - Address (in all languages)')
    console.log('   - Google Maps embed URL')
    console.log('   - Open Graph image')
  } catch (error) {
    console.error('❌ Error seeding settings:', error)
    throw error
  }
}

seedSettings()
  .then(() => {
    console.log('\n✨ Seeding complete!')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
