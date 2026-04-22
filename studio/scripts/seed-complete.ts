/**
 * Complete seed script for DotDeep Design
 * Run with: npx sanity exec scripts/seed-complete.ts --with-user-token
 */

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

// ===== SITE SETTINGS =====
const siteSettings = {
  _id: 'siteSettings',
  _type: 'settings',
  title: 'DotDeep Design Studio',
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
  contactEmail: 'dotdeepdesign@gmail.com',
  contactPhone: '+856 20 5981 4656',
  address: null, // No address provided
  socialLinks: {
    _type: 'socialLinks',
    facebook: 'https://www.facebook.com/profile.php?id=61559046960453',
    instagram: 'https://www.instagram.com/dotdeep_design',
    tiktok: null,
    whatsapp: '8562059814656',
    line: null,
    linkedin: null,
  },
  googleMapsEmbed: null,
}

// ===== HOME PAGE =====
const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  
  // Hero Section
  heroHeading: {
    _type: 'localizedString',
    en: 'Crafting Digital Experiences',
    th: 'สร้างสรรค์ประสบการณ์ดิจิทัล',
    lo: 'ສ້າງສັນປະສົບການດິຈິຕອນ',
  },
  heroSubheading: {
    _type: 'localizedString',
    en: 'From Laos to the World — We transform ideas into stunning digital realities',
    th: 'จากลาวสู่ทั่วโลก — เราเปลี่ยนไอเดียให้เป็นความจริงทางดิจิทัลที่น่าทึ่ง',
    lo: 'ຈາກລາວສູ່ທົ່ວໂລກ — ພວກເຮົາປ່ຽນແນວຄວາມຄິດໃຫ້ເປັນຄວາມຈິງທາງດິຈິຕອນທີ່ໜ້າປະທັບໃຈ',
  },
  heroCtaText: {
    _type: 'localizedString',
    en: 'View Our Work',
    th: 'ดูผลงานของเรา',
    lo: 'ເບິ່ງຜົນງານຂອງພວກເຮົາ',
  },
  heroCtaLink: '/gallery',
  
  // Stats Bar
  stats: [
    {
      _key: 'stat1',
      _type: 'stat',
      value: '50',
      suffix: '+',
      label: {
        _type: 'localizedString',
        en: 'Projects Completed',
        th: 'โปรเจกต์เสร็จสมบูรณ์',
        lo: 'ໂປຣເຈັກສຳເລັດ',
      },
    },
    {
      _key: 'stat2',
      _type: 'stat',
      value: '3',
      suffix: '+',
      label: {
        _type: 'localizedString',
        en: 'Years Experience',
        th: 'ปีประสบการณ์',
        lo: 'ປີປະສົບການ',
      },
    },
    {
      _key: 'stat3',
      _type: 'stat',
      value: '30',
      suffix: '+',
      label: {
        _type: 'localizedString',
        en: 'Happy Clients',
        th: 'ลูกค้าพึงพอใจ',
        lo: 'ລູກຄ້າພໍໃຈ',
      },
    },
    {
      _key: 'stat4',
      _type: 'stat',
      value: '100',
      suffix: '%',
      label: {
        _type: 'localizedString',
        en: 'Client Satisfaction',
        th: 'ความพึงพอใจ',
        lo: 'ຄວາມພໍໃຈ',
      },
    },
  ],
  
  // Services Heading
  servicesHeading: {
    _type: 'localizedString',
    en: 'What We Do Best',
    th: 'สิ่งที่เราทำได้ดีที่สุด',
    lo: 'ສິ່ງທີ່ພວກເຮົາເຮັດໄດ້ດີທີ່ສຸດ',
  },
  
  // CTA Section
  ctaHeading: {
    _type: 'localizedString',
    en: "Let's Create Something Amazing Together",
    th: 'มาสร้างสรรค์สิ่งที่น่าทึ่งด้วยกัน',
    lo: 'ມາສ້າງສັນສິ່ງທີ່ໜ້າປະທັບໃຈນຳກັນ',
  },
  ctaText: {
    _type: 'localizedString',
    en: "Have a project in mind? We would love to hear about it. Get in touch and lets bring your vision to life.",
    th: 'มีโปรเจคในใจอยู่ใช่ไหม? เรายินดีรับฟัง ติดต่อเราและมาทำให้วิสัยทัศน์ของคุณเป็นจริง',
    lo: 'ມີໂປຣເຈັກໃນໃຈບໍ່? ພວກເຮົາຍິນດີຮັບຟັງ ຕິດຕໍ່ພວກເຮົາແລະມາເຮັດໃຫ້ວິໄສທັດຂອງທ່ານເປັນຈິງ',
  },
}

// ===== ABOUT PAGE =====
const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heading: {
    _type: 'localizedString',
    en: 'About DotDeep Design',
    th: 'เกี่ยวกับ DotDeep Design',
    lo: 'ກ່ຽວກັບ DotDeep Design',
  },
  vision: [
    {
      _type: 'block',
      _key: 'vision1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'vspan1',
          text: 'To be the leading creative digital studio in Southeast Asia, bridging Lao creativity with global standards.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  mission: [
    {
      _type: 'block',
      _key: 'mission1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'mspan1',
          text: 'We empower businesses and individuals through exceptional design, innovative technology, and strategic thinking.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  story: [
    {
      _type: 'block',
      _key: 'story1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'sspan1',
          text: 'Founded in Vientiane, DotDeep Design started with a simple mission: to bring world-class digital design to Laos. Today, we serve clients across Southeast Asia and beyond.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  techStack: [
    {_key: 'tech1', name: 'Adobe Creative Suite', icon: 'palette'},
    {_key: 'tech2', name: 'Figma', icon: 'layout'},
    {_key: 'tech3', name: 'React', icon: 'code'},
    {_key: 'tech4', name: 'Next.js', icon: 'code'},
    {_key: 'tech5', name: 'Tailwind CSS', icon: 'code'},
    {_key: 'tech6', name: 'Node.js', icon: 'code'},
    {_key: 'tech7', name: 'WordPress', icon: 'code'},
    {_key: 'tech8', name: 'Premiere Pro', icon: 'video'},
    {_key: 'tech9', name: 'After Effects', icon: 'video'},
  ],
}

async function seedAll() {
  console.log('🌱 Starting complete seed for DotDeep Design...\n')

  try {
    // Seed Settings
    console.log('📝 Creating site settings...')
    await client.createOrReplace(siteSettings)
    console.log('✅ Site settings created')

    // Seed Home Page
    console.log('📝 Creating home page...')
    await client.createOrReplace(homePage)
    console.log('✅ Home page created')

    // Seed About Page
    console.log('📝 Creating about page...')
    await client.createOrReplace(aboutPage)
    console.log('✅ About page created')

    console.log('\n✨ Seeding complete!')
    console.log('\n📋 Next steps:')
    console.log('   1. Go to Sanity Studio and upload images')
    console.log('   2. Create your first project in the Projects section')
    console.log('   3. Add services in the Services section')
    console.log('   4. Add team members in the People section')
    console.log('   5. Create pricing packages in the Pricing section')
    console.log('\n🚀 Your site is ready to go live!')
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  }
}

seedAll()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
