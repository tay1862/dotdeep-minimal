/**
 * DotDeep Design — Sanity Seed Script
 *
 * Run from the /studio directory:
 *   npx sanity exec scripts/seed.ts --with-user-token
 *
 * This will populate your Sanity dataset with realistic sample content.
 */

import {createClient, type SanityClient} from '@sanity/client'
import dns from 'node:dns'
import {readFileSync} from 'fs'
import {resolve} from 'path'

// Load env from frontend .env.local
function loadEnv(): Record<string, string> {
  try {
    const envPath = resolve(process.cwd(), '../frontend/.env.local')
    const content = readFileSync(envPath, 'utf-8')
    const env: Record<string, string> = {}
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      env[key] = val
    }
    return env
  } catch {
    return {}
  }
}

const env = loadEnv()

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = env.SANITY_API_WRITE_TOKEN || env.SANITY_API_READ_TOKEN || process.env.SANITY_AUTH_TOKEN || ''

const originalLookup = dns.lookup.bind(dns)
dns.lookup = ((hostname: string, options: unknown, callback?: unknown) => {
  const normalizedOptions = typeof options === 'function' ? {} : options
  const normalizedCallback = (typeof options === 'function' ? options : callback) as (
    error: NodeJS.ErrnoException | null,
    address: string,
    family: number,
  ) => void

  return originalLookup(hostname, normalizedOptions as any, (error, address, family) => {
    if (!error) {
      normalizedCallback(null, address, family)
      return
    }

    if (error.code !== 'ENOTFOUND') {
      normalizedCallback(error, address, family)
      return
    }

    dns.resolve4(hostname, (resolveError, addresses) => {
      if (resolveError || !addresses.length) {
        normalizedCallback(error, address, family)
        return
      }

      normalizedCallback(null, addresses[0], 4)
    })
  })
}) as typeof dns.lookup

if (!projectId) {
  console.error('❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID in frontend/.env.local')
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-09-25',
  useCdn: false,
  token,
})

// ─── Helpers ────────────────────────────────────────────────────────────────

const block = (text: string) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2, 9),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: Math.random().toString(36).slice(2, 9), text, marks: []}],
})

const locStr = (en: string, th: string, lo: string) => ({en, th, lo})
const locBlocks = (en: string, th: string, lo: string) => ({
  en: [block(en)],
  th: [block(th)],
  lo: [block(lo)],
})

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    _id: 'service-graphic',
    _type: 'service',
    title: locStr(
      'Graphic Design',
      'กราฟิกดีไซน์',
      'ອອກແບບກຣາຟິກ',
    ),
    slug: {_type: 'slug', current: 'graphic-design'},
    shortDescription: locStr(
      'Logos, branding, print & digital graphics that make your business stand out.',
      'โลโก้ แบรนด์ดิ้ง สิ่งพิมพ์ และกราฟิกดิจิทัลที่ทำให้ธุรกิจคุณโดดเด่น',
      'ໂລໂກ້, ເອກະລັກແບຣນ, ສິ່ງພິມ ແລະ ກຣາຟິກດິຈິຕອລທີ່ເຮັດໃຫ້ທຸລະກິດຂອງທ່ານໂດດເດັ່ນ',
    ),
    description: locBlocks(
      'Our graphic design service covers everything from brand identity creation to marketing materials. We combine strategic thinking with creative execution to produce visuals that communicate your brand values clearly and memorably.',
      'บริการออกแบบกราฟิกของเราครอบคลุมทุกอย่างตั้งแต่การสร้างเอกลักษณ์แบรนด์ไปจนถึงสื่อการตลาด',
      'ການບໍລິການອອກແບບກຣາຟິກຂອງເຮົາຄອບຄຸມທຸກຢ່າງ ຕັ້ງແຕ່ການສ້າງເອກະລັກແບຣນ ຈົນເຖິງສື່ການຕະຫຼາດ.',
    ),
    icon: 'palette',
    features: [
      locStr('Logo & Brand Identity', 'โลโก้และเอกลักษณ์แบรนด์', 'ໂລໂກ້ ແລະ ເອກະລັກແບຣນ'),
      locStr('Business Card & Stationery', 'นามบัตรและเครื่องเขียน', 'ນາມບັດ ແລະ ສິ່ງພິມ'),
      locStr('Poster & Banner Design', 'ออกแบบโปสเตอร์และแบนเนอร์', 'ອອກແບບໂປສເຕີ ແລະ ແບນເນີ'),
      locStr('Social Media Graphics', 'กราฟิกโซเชียลมีเดีย', 'ກຣາຟິກໂຊຊຽວມີເດຍ'),
      locStr('Packaging Design', 'ออกแบบบรรจุภัณฑ์', 'ອອກແບບຫຸ້ມຫໍ່'),
      locStr('Infographic Design', 'ออกแบบอินโฟกราฟิก', 'ອອກແບບ Infographic'),
    ],
    order: 1,
  },
  {
    _id: 'service-web',
    _type: 'service',
    title: locStr('Web Development', 'พัฒนาเว็บไซต์', 'ພັດທະນາເວັບໄຊທ໌'),
    slug: {_type: 'slug', current: 'web-development'},
    shortDescription: locStr(
      'Fast, modern websites and landing pages built for performance and conversions.',
      'เว็บไซต์และหน้าแลนดิ้งเพจที่ทันสมัย รวดเร็ว สร้างขึ้นเพื่อประสิทธิภาพและ Conversion',
      'ເວັບໄຊທ໌ ແລະ Landing Page ທີ່ທັນສະໄໝ, ໄວ, ສ້າງຂຶ້ນເພື່ອປະສິດທິພາບ.',
    ),
    description: locBlocks(
      'We build clean, fast, and maintainable websites using modern tools. From simple landing pages to full-featured business sites with CMS integration, we ensure your web presence is professional and effective.',
      'เราสร้างเว็บไซต์ที่สวยงาม รวดเร็ว และดูแลรักษาง่ายด้วยเครื่องมือที่ทันสมัย',
      'ເຮົາສ້າງເວັບໄຊທ໌ທີ່ສະອາດ, ໄວ ແລະ ງ່າຍຕໍ່ການດູແລ ດ້ວຍເຄື່ອງມືທັນສະໄໝ.',
    ),
    icon: 'code',
    features: [
      locStr('Business Website', 'เว็บไซต์ธุรกิจ', 'ເວັບໄຊທ໌ທຸລະກິດ'),
      locStr('Landing Page', 'หน้า Landing Page', 'ໜ້າ Landing Page'),
      locStr('E-Commerce Store', 'ร้านค้าออนไลน์', 'ຮ້ານຄ້າອອນລາຍ'),
      locStr('CMS Integration', 'ระบบ CMS', 'ລະບົບ CMS'),
      locStr('SEO Optimization', 'SEO Optimization', 'ການປັບ SEO'),
      locStr('Mobile Responsive', 'รองรับมือถือ', 'ຮອງຮັບໂທລະສັບ'),
    ],
    order: 2,
  },
  {
    _id: 'service-uiux',
    _type: 'service',
    title: locStr('UI/UX Design', 'ออกแบบ UI/UX', 'ອອກແບບ UI/UX'),
    slug: {_type: 'slug', current: 'ui-ux-design'},
    shortDescription: locStr(
      'User-centered interfaces and experiences that are intuitive, beautiful, and conversion-focused.',
      'อินเทอร์เฟซและประสบการณ์ผู้ใช้ที่เป็นศูนย์กลาง ใช้งานง่าย สวยงาม',
      'ອິນເຕີເຟດ ແລະ ປະສົບການຜູ້ໃຊ້ທີ່ເໝາະສົມ, ສວຍງາມ ແລະ ງ່າຍຕໍ່ການໃຊ້ງານ.',
    ),
    description: locBlocks(
      'Great design starts with understanding users. We research, wireframe, prototype and test to create interfaces that feel natural and achieve business goals. Every pixel has a purpose.',
      'การออกแบบที่ดีเริ่มต้นด้วยการเข้าใจผู้ใช้ เราวิจัย ร่าง ต้นแบบ และทดสอบเพื่อสร้างอินเทอร์เฟซที่รู้สึกเป็นธรรมชาติ',
      'ການອອກແບບທີ່ດີເລີ່ມຕົ້ນດ້ວຍການເຂົ້າໃຈຜູ້ໃຊ້. ເຮົາຄົ້ນຄວ້າ, ສ້າງ Wireframe, Prototype ແລະ ທົດສອບ.',
    ),
    icon: 'layout',
    features: [
      locStr('User Research', 'การวิจัยผู้ใช้', 'ການຄົ້ນຄວ້າຜູ້ໃຊ້'),
      locStr('Wireframing & Prototyping', 'Wireframe และ Prototype', 'Wireframe ແລະ Prototype'),
      locStr('Mobile App Design', 'ออกแบบแอปมือถือ', 'ອອກແບບແອັບໂທລະສັບ'),
      locStr('Dashboard & Admin UI', 'Dashboard และหน้า Admin', 'Dashboard ແລະ ໜ້າ Admin'),
      locStr('Design System', 'Design System', 'ລະບົບການອອກແບບ'),
      locStr('Figma Prototyping', 'สร้าง Prototype ด้วย Figma', 'ສ້າງ Prototype ດ້ວຍ Figma'),
    ],
    order: 3,
  },
  {
    _id: 'service-video',
    _type: 'service',
    title: locStr('Video & Motion', 'วิดีโอและ Motion', 'ວີດີໂອ ແລະ Motion'),
    slug: {_type: 'slug', current: 'video-motion'},
    shortDescription: locStr(
      'Engaging video content, motion graphics, and animations for social media and marketing.',
      'คอนเทนต์วิดีโอ motion graphics และแอนิเมชัน สำหรับโซเชียลมีเดียและการตลาด',
      'ເນື້ອຫາວີດີໂອ, Motion Graphics ແລະ Animation ສຳລັບໂຊຊຽວມີເດຍ.',
    ),
    description: locBlocks(
      'From short-form social media content to full promotional videos, we bring your brand story to life through motion. Our team handles concept, shooting, editing and post-production.',
      'ตั้งแต่คอนเทนต์โซเชียลมีเดียรูปแบบสั้นไปจนถึงวิดีโอโปรโมชั่นเต็มรูปแบบ เราช่วยให้แบรนด์คุณมีชีวิต',
      'ຕັ້ງແຕ່ Content ໂຊຊຽວໄລຍ:ສັ້ນ ຈົນເຖິງວີດີໂອໂຄສະນາ, ເຮົາຊ່ວຍໃຫ້ເລື່ອງແບຣນຂອງທ່ານມີຊີວິດ.',
    ),
    icon: 'video',
    features: [
      locStr('Promotional Video', 'วิดีโอโปรโมชัน', 'ວີດີໂອໂຄສະນາ'),
      locStr('Social Media Reels', 'Reels โซเชียลมีเดีย', 'ວີດີໂອ Reels'),
      locStr('Motion Graphics', 'Motion Graphics', 'Motion Graphics'),
      locStr('Logo Animation', 'แอนิเมชันโลโก้', 'Animation ໂລໂກ້'),
      locStr('Product Showcase Video', 'วิดีโอโชว์ผลิตภัณฑ์', 'ວີດີໂອສະແດງສິນຄ້າ'),
      locStr('Video Editing', 'ตัดต่อวิดีโอ', 'ຕັດຕໍ່ວີດີໂອ'),
    ],
    order: 4,
  },
  {
    _id: 'service-social',
    _type: 'service',
    title: locStr('Social Media Content', 'คอนเทนต์โซเชียลมีเดีย', 'Content ໂຊຊຽວມີເດຍ'),
    slug: {_type: 'slug', current: 'social-media-content'},
    shortDescription: locStr(
      'Scroll-stopping content designed for Facebook, Instagram, TikTok and more.',
      'คอนเทนต์ที่หยุดการเลื่อนหน้าจอ ออกแบบสำหรับ Facebook, Instagram, TikTok และอื่นๆ',
      'Content ທີ່ໃຫ້ຢຸດເລື່ອນ, ອອກແບບສຳລັບ Facebook, Instagram, TikTok ແລະອື່ນໆ.',
    ),
    description: locBlocks(
      'Your social media presence needs consistent, on-brand content that captures attention and drives engagement. We plan, design, and deliver ready-to-post graphics, captions, and assets for all your channels.',
      'การมีตัวตนบนโซเชียลมีเดียต้องการคอนเทนต์ที่สม่ำเสมอ ตรงแบรนด์ และดึงดูดความสนใจ เราวางแผน ออกแบบ และส่งมอบกราฟิก',
      'ການມີຕົວຕົນໃນໂຊຊຽວຕ້ອງການ Content ທີ່ສອດຄ່ອງ, ຕອບໂຈດແບຣນ ແລະ ດຶງດູດຄວາມສົນໃຈ.',
    ),
    icon: 'share',
    features: [
      locStr('Feed Post Design', 'ออกแบบโพสต์ Feed', 'ອອກແບບໂພສ Feed'),
      locStr('Story & Reel Templates', 'เทมเพลต Story และ Reel', 'Template Story ແລະ Reel'),
      locStr('Caption Copywriting', 'เขียน Caption', 'ຂຽນ Caption'),
      locStr('Content Calendar Planning', 'วางแผน Content Calendar', 'ວາງແຜນ Content Calendar'),
      locStr('Brand Consistency', 'ความสม่ำเสมอของแบรนด์', 'ຄວາມສອດຄ່ອງຂອງແບຣນ'),
      locStr('Monthly Content Packages', 'แพ็กเกจคอนเทนต์รายเดือน', 'ແພັກເກດ Content ລາຍເດືອນ'),
    ],
    order: 5,
  },
]

const PRICING = [
  // Graphic Design packages
  {
    _id: 'price-logo-basic',
    _type: 'pricingItem',
    name: locStr('Logo Basic', 'โลโก้เบสิก', 'ໂລໂກ້ເບສິກ'),
    service: {_type: 'reference', _ref: 'service-graphic'},
    price: 500000,
    currency: 'LAK',
    description: locStr(
      'A clean, professional logo for your brand.',
      'โลโก้สะอาด มืออาชีพสำหรับแบรนด์ของคุณ',
      'ໂລໂກ້ທີ່ສະອາດ, ເປັນມືອາຊີບ ສຳລັບແບຣນຂອງທ່ານ.',
    ),
    features: [
      locStr('3 initial concepts', '3 แนวคิดเริ่มต้น', '3 ແນວຄິດເລີ່ມຕົ້ນ'),
      locStr('2 revision rounds', '2 รอบการแก้ไข', '2 ຮອບການແກ້ໄຂ'),
      locStr('Final files: PNG, SVG, PDF', 'ไฟล์สุดท้าย: PNG, SVG, PDF', 'ໄຟລ໌ສຸດທ້າຍ: PNG, SVG, PDF'),
      locStr('Delivery in 5 business days', 'ส่งมอบใน 5 วันทำการ', 'ສົ່ງພາຍໃນ 5 ວັນ'),
    ],
    order: 1,
  },
  {
    _id: 'price-brand-identity',
    _type: 'pricingItem',
    name: locStr('Brand Identity', 'เอกลักษณ์แบรนด์', 'ເອກະລັກແບຣນ'),
    service: {_type: 'reference', _ref: 'service-graphic'},
    price: 1500000,
    currency: 'LAK',
    description: locStr(
      'Complete brand package including logo, colors, fonts, and usage guidelines.',
      'แพ็คเกจแบรนด์ครบชุด รวมโลโก้ สี ฟอนต์ และคู่มือการใช้งาน',
      'ຊຸດແບຣນຄົບຊຸດ ລວມໂລໂກ້, ສີ, ຟອນ ແລະ ຄູ່ມືການນຳໃຊ້.',
    ),
    features: [
      locStr('Logo + icon variants', 'โลโก้ + ตัวแปรไอคอน', 'ໂລໂກ້ + ຕົວແປ Icon'),
      locStr('Color palette & typography', 'พาเลตสีและการจัดวางตัวอักษร', 'ສີ ແລະ ຟອນ'),
      locStr('Brand guideline PDF', 'ไฟล์ Brand Guideline PDF', 'ไฟล์ Brand Guideline PDF'),
      locStr('Business card design', 'ออกแบบนามบัตร', 'ອອກແບບนາມບັດ'),
      locStr('Social media profile kit', 'ชุด Profile โซเชียลมีเดีย', 'ຊຸດ Profile ໂຊຊຽວ'),
      locStr('3 revision rounds', '3 รอบการแก้ไข', '3 ຮອບການແກ້ໄຂ'),
    ],
    order: 2,
  },
  // Web packages
  {
    _id: 'price-landing-page',
    _type: 'pricingItem',
    name: locStr('Landing Page', 'หน้า Landing Page', 'ໜ້າ Landing Page'),
    service: {_type: 'reference', _ref: 'service-web'},
    price: 1500000,
    currency: 'LAK',
    description: locStr(
      'Single-page website designed to convert visitors into customers.',
      'เว็บไซต์หน้าเดียวที่ออกแบบมาเพื่อเปลี่ยนผู้เยี่ยมชมเป็นลูกค้า',
      'ເວັບໄຊທ໌ໜ້າດຽວທີ່ອອກແບບເພື່ອປ່ຽນຜູ້ຢ້ຽມຊົມເປັນລູກຄ້າ.',
    ),
    features: [
      locStr('1 page, fully responsive', '1 หน้า รองรับทุกอุปกรณ์', '1 ໜ້າ, ຮອງຮັບທຸກອຸປະກອນ'),
      locStr('Contact form integration', 'ฟอร์มติดต่อ', 'ຟອມຕິດຕໍ່'),
      locStr('Google Analytics setup', 'ติดตั้ง Google Analytics', 'ຕິດຕັ້ງ Google Analytics'),
      locStr('Basic SEO optimization', 'SEO ขั้นพื้นฐาน', 'ການປັບ SEO ພື້ນຖານ'),
      locStr('Delivery in 7 days', 'ส่งมอบใน 7 วัน', 'ສົ່ງພາຍໃນ 7 ວັນ'),
    ],
    order: 3,
  },
  {
    _id: 'price-business-website',
    _type: 'pricingItem',
    name: locStr('Business Website', 'เว็บไซต์ธุรกิจ', 'ເວັບໄຊທ໌ທຸລະກິດ'),
    service: {_type: 'reference', _ref: 'service-web'},
    price: 4000000,
    currency: 'LAK',
    description: locStr(
      'Multi-page professional website with CMS so you can update content yourself.',
      'เว็บไซต์มืออาชีพหลายหน้าพร้อม CMS ให้อัปเดตเนื้อหาด้วยตนเอง',
      'ເວັບໄຊທ໌ຫຼາຍໜ້າ ພ້ອມ CMS ໃຫ້ທ່ານອັບເດດເນື້ອຫາເອງ.',
    ),
    features: [
      locStr('Up to 6 pages', 'สูงสุด 6 หน้า', 'ສູງສຸດ 6 ໜ້າ'),
      locStr('Sanity CMS integration', 'ระบบ Sanity CMS', 'ລະບົບ Sanity CMS'),
      locStr('Mobile & SEO optimized', 'รองรับมือถือและ SEO', 'ຮອງຮັບໂທລະສັບ ແລະ SEO'),
      locStr('Contact form + email notification', 'ฟอร์มติดต่อ + แจ้งเตือนอีเมล', 'ຟອມຕິດຕໍ່ + ແຈ້ງເຕືອນອີເມລ'),
      locStr('1 month support', 'รองรับ 1 เดือน', 'ຮອງຮັບ 1 ເດືອນ'),
      locStr('Deployment to Vercel', 'Deploy บน Vercel', 'Deploy ເທິງ Vercel'),
    ],
    order: 4,
  },
  // UI/UX
  {
    _id: 'price-app-design',
    _type: 'pricingItem',
    name: locStr('Mobile App UI', 'UI แอปมือถือ', 'UI ແອັບໂທລະສັບ'),
    service: {_type: 'reference', _ref: 'service-uiux'},
    price: 3000000,
    currency: 'LAK',
    description: locStr(
      'Complete UI design for mobile app with Figma prototype and handoff files.',
      'ออกแบบ UI ครบสำหรับแอปมือถือพร้อม Figma Prototype และไฟล์ Handoff',
      'ອອກແບບ UI ຄົບຊຸດ ສຳລັບແອັບໂທລະສັບ ພ້ອມ Figma Prototype.',
    ),
    features: [
      locStr('Up to 10 screens', 'สูงสุด 10 หน้าจอ', 'ສູງສຸດ 10 ໜ້າຈໍ'),
      locStr('Component library in Figma', 'คลังcomponent ใน Figma', 'ຄັງ Component ໃນ Figma'),
      locStr('Interactive prototype', 'Prototype แบบ Interactive', 'Prototype ແບບ Interactive'),
      locStr('Developer handoff files', 'ไฟล์ Handoff สำหรับ Developer', 'ໄຟລ໌ Handoff ສຳລັບ Developer'),
      locStr('2 revision rounds', '2 รอบการแก้ไข', '2 ຮອບການແກ້ໄຂ'),
    ],
    order: 5,
  },
  // Video
  {
    _id: 'price-social-video',
    _type: 'pricingItem',
    name: locStr('Social Media Video', 'วิดีโอโซเชียลมีเดีย', 'ວີດີໂອໂຊຊຽວ'),
    service: {_type: 'reference', _ref: 'service-video'},
    price: 800000,
    currency: 'LAK',
    description: locStr(
      '30-60 second video with motion graphics, for Instagram, Facebook or TikTok.',
      'วิดีโอ 30-60 วินาที พร้อม motion graphics สำหรับ Instagram, Facebook หรือ TikTok',
      'ວີດີໂອ 30-60 ວິນາທີ ພ້ອມ Motion Graphics ສຳລັບ Instagram, Facebook ຫຼື TikTok.',
    ),
    features: [
      locStr('30-60 second duration', 'ความยาว 30-60 วินาที', 'ຄວາມຍາວ 30-60 ວິນາທີ'),
      locStr('Custom motion graphics', 'Motion Graphics แบบ Custom', 'Motion Graphics ແບບ Custom'),
      locStr('Background music', 'เพลงประกอบ', 'ດົນຕີປະກອບ'),
      locStr('Subtitles / captions', 'ซับไตเติ้ลและ Caption', 'ຊັບໄຕເຕິ້ລ'),
      locStr('1 revision round', '1 รอบการแก้ไข', '1 ຮອບການແກ້ໄຂ'),
    ],
    order: 6,
  },
]

const TEAM = [
  {
    _id: 'person-asean',
    _type: 'person',
    firstName: 'ສົມຈັນ',
    lastName: 'ໄຊຍະວົງ',
    nickname: 'Asean',
    role: locStr('Graphic Designer', 'กราฟิกดีไซเนอร์', 'ກຣາຟິກດີໄຊເນີ'),
    bio: locStr(
      'Co-founder of DotDeep Design. Leads all visual direction — from brand identity and logo design to print and digital graphics.',
      'ผู้ร่วมก่อตั้ง DotDeep Design รับผิดชอบทิศทางภาพทั้งหมด ตั้งแต่เอกลักษณ์แบรนด์ โลโก้ ไปจนถึงกราฟิก',
      'ຜູ້ຮ່ວມກໍ່ຕັ້ງ DotDeep Design. ນຳທິດທາງວິຊວນທັງໝົດ — ຕັ້ງແຕ່ເອກະລັກແບຣນ, ໂລໂກ້ ຈົນເຖິງກຣາຟິກ.',
    ),
    socialLinks: {},
    order: 1,
  },
  {
    _id: 'person-tae',
    _type: 'person',
    firstName: 'ອາພິລັກ',
    lastName: 'ຈະເລີນຜົນ',
    nickname: 'Tae',
    role: locStr('Developer', 'นักพัฒนา', 'ນັກພັດທະນາ'),
    bio: locStr(
      'Co-founder of DotDeep Design. Builds the web experiences — specializing in Next.js, React, and headless CMS solutions that are fast, scalable, and beautiful.',
      'ผู้ร่วมก่อตั้ง DotDeep Design รับผิดชอบการพัฒนาเว็บ เชี่ยวชาญ Next.js, React และ Headless CMS',
      'ຜູ້ຮ່ວມກໍ່ຕັ້ງ DotDeep Design. ສ້າງປະສົບການເວັບ — ຊ່ຽວຊານ Next.js, React ແລະ Headless CMS.',
    ),
    socialLinks: {},
    order: 2,
  },
]

const PROJECTS = [
  {
    _id: 'project-green-coffee',
    _type: 'project',
    title: locStr(
      'Green Leaf Coffee — Brand Identity',
      'Green Leaf Coffee — เอกลักษณ์แบรนด์',
      'Green Leaf Coffee — ເອກະລັກແບຣນ',
    ),
    slug: {_type: 'slug', current: 'green-leaf-coffee'},
    client: 'Green Leaf Coffee',
    category: 'graphic',
    description: locBlocks(
      'Complete brand identity for a Vientiane-based specialty coffee shop. We created a fresh, modern identity that reflects the shop\'s premium yet approachable character.',
      'เอกลักษณ์แบรนด์ครบชุดสำหรับร้านกาแฟ Specialty ในเวียงจันทน์ เราสร้างเอกลักษณ์ที่สดชื่น ทันสมัย',
      'ເອກະລັກແບຣນຄົບຊຸດ ສຳລັບຮ້ານກາເຟ Specialty ໃນວຽງຈັນ. ເຮົາສ້າງເອກະລັກທີ່ສົດຊື່ນ, ທັນສະໄໝ.',
    ),
    techStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Brand Strategy'],
    featured: true,
    order: 1,
    completedAt: '2025-08-15',
  },
  {
    _id: 'project-bcel-landing',
    _type: 'project',
    title: locStr(
      'BCEL Financial — Landing Page',
      'BCEL Financial — Landing Page',
      'BCEL Financial — Landing Page',
    ),
    slug: {_type: 'slug', current: 'bcel-financial-landing'},
    client: 'BCEL Bank',
    category: 'web',
    description: locBlocks(
      'High-conversion landing page for BCEL Bank\'s new savings product launch in Laos. Built with Next.js for performance and SEO.',
      'Landing Page ที่มี Conversion สูง สำหรับการเปิดตัวผลิตภัณฑ์ออมทรัพย์ใหม่ของ BCEL Bank',
      'Landing Page ທີ່ມີ Conversion ສູງ ສຳລັບການເປີດໂຕຜະລິດຕະພັນออมทรัพย์ ຂອງ BCEL Bank.',
    ),
    techStack: ['Next.js', 'Tailwind CSS', 'Sanity'],
    projectUrl: 'https://bcel.la',
    featured: true,
    order: 2,
    completedAt: '2025-10-01',
  },
  {
    _id: 'project-lao-fresh',
    _type: 'project',
    title: locStr(
      'Lao Fresh Market — App UI',
      'Lao Fresh Market — App UI',
      'Lao Fresh Market — App UI',
    ),
    slug: {_type: 'slug', current: 'lao-fresh-market-app'},
    client: 'Lao Fresh Market',
    category: 'uiux',
    description: locBlocks(
      'Mobile app UI/UX design for a Lao online grocery delivery platform. Clean, intuitive interface designed for Lao users with multilingual support.',
      'การออกแบบ UI/UX แอปมือถือสำหรับแพลตฟอร์มส่งของชำออนไลน์ของลาว',
      'ການອອກແບບ UI/UX ແອັບໂທລະສັບ ສຳລັບ Platform ສຸດ Online ຂອງລາວ.',
    ),
    techStack: ['Figma', 'Prototyping', 'User Research', 'Design System'],
    featured: true,
    order: 3,
    completedAt: '2025-07-20',
  },
  {
    _id: 'project-vientiane-cafe',
    _type: 'project',
    title: locStr(
      'Vientiane Café — Social Media Campaign',
      'Vientiane Café — แคมเปญโซเชียลมีเดีย',
      'Vientiane Café — ແຄມເປນໂຊຊຽວ',
    ),
    slug: {_type: 'slug', current: 'vientiane-cafe-social'},
    client: 'Vientiane Café',
    category: 'video',
    description: locBlocks(
      'A series of short-form video content and motion graphics for a trendy Vientiane café\'s Instagram and TikTok channels.',
      'คอนเทนต์วิดีโอรูปแบบสั้นและ motion graphics สำหรับช่อง Instagram และ TikTok ของร้านกาแฟ',
      'ເນື້ອຫາວີດີໂອໄລຍ:ສັ້ນ ແລະ Motion Graphics ສຳລັບ Instagram ແລະ TikTok.',
    ),
    techStack: ['After Effects', 'Premiere Pro', 'Capcut'],
    featured: false,
    order: 4,
    completedAt: '2025-11-10',
  },
  {
    _id: 'project-lotus-spa',
    _type: 'project',
    title: locStr(
      'Lotus Spa — Brand & Website',
      'Lotus Spa — แบรนด์และเว็บไซต์',
      'Lotus Spa — ແບຣນ ແລະ ເວັບໄຊທ໌',
    ),
    slug: {_type: 'slug', current: 'lotus-spa'},
    client: 'Lotus Spa Vientiane',
    category: 'web',
    description: locBlocks(
      'Full brand identity and website for a luxury spa in Vientiane. Elegant design reflecting the calm and renewal experience the spa offers.',
      'เอกลักษณ์แบรนด์และเว็บไซต์ครบชุดสำหรับ Spa หรูในเวียงจันทน์',
      'ເອກະລັກແບຣນ ແລະ ເວັບໄຊທ໌ຄົບຊຸດ ສຳລັບ Spa ຫຼູ ໃນວຽງຈັນ.',
    ),
    techStack: ['Next.js', 'Sanity', 'Adobe Illustrator', 'Figma'],
    featured: false,
    order: 5,
    completedAt: '2025-06-01',
  },
  {
    _id: 'project-lao-tec',
    _type: 'project',
    title: locStr(
      'LaoTec — Startup Dashboard UI',
      'LaoTec — Dashboard UI ของสตาร์ทอัพ',
      'LaoTec — Dashboard UI ຂອງ Startup',
    ),
    slug: {_type: 'slug', current: 'laotec-dashboard'},
    client: 'LaoTec Co., Ltd.',
    category: 'uiux',
    description: locBlocks(
      'Admin dashboard design for a Lao fintech startup. Complex data tables, charts, and workflows simplified into an intuitive UI.',
      'การออกแบบ Admin Dashboard สำหรับ Startup Fintech ลาว ข้อมูลซับซ้อนถูกทำให้ง่ายขึ้น',
      'ການອອກແບບ Admin Dashboard ສຳລັບ Startup Fintech ລາວ.',
    ),
    techStack: ['Figma', 'Design System', 'Data Visualization'],
    featured: false,
    order: 6,
    completedAt: '2026-01-15',
  },
]

const HOMEPAGE = {
  _id: 'homePage',
  _type: 'homePage',
  heroHeading: locStr(
    'We Design Digital Experiences That Matter',
    'เราออกแบบประสบการณ์ดิจิทัลที่สร้างความแตกต่าง',
    'ພວກເຮົາອອກແບບປະສົບການດິຈິຕອລທີ່ສ້າງຄວາມແຕກຕ່າງ',
  ),
  heroSubheading: locStr(
    'DotDeep Design — A creative studio from Laos crafting brands, websites, and content for businesses across Southeast Asia.',
    'DotDeep Design — สตูดิโอสร้างสรรค์จากลาว สร้างแบรนด์ เว็บไซต์ และคอนเทนต์',
    'DotDeep Design — ສຕູດິໂອສ້າງສັນຈາກລາວ ສ້າງແບຣນ, ເວັບໄຊທ໌ ແລະ Content ສຳລັບທຸລະກິດ.',
  ),
  heroCtaText: locStr('See Our Work', 'ดูผลงาน', 'ເບິ່ງຜົນງານ'),
  heroCtaLink: '/gallery',
  stats: [
    {
      _key: 'stat-years',
      value: '3',
      suffix: '+',
      label: locStr('Years Experience', 'ปีประสบการณ์', 'ປີປະສົບການ'),
    },
    {
      _key: 'stat-projects',
      value: '50',
      suffix: '+',
      label: locStr('Projects Delivered', 'โปรเจกต์ที่ส่งมอบ', 'ໂຄງການທີ່ສຳເລັດ'),
    },
    {
      _key: 'stat-clients',
      value: '30',
      suffix: '+',
      label: locStr('Happy Clients', 'ลูกค้าที่พึงพอใจ', 'ລູກຄ້າທີ່ພໍໃຈ'),
    },
    {
      _key: 'stat-countries',
      value: '3',
      suffix: '',
      label: locStr('Countries Served', 'ประเทศที่ให้บริการ', 'ປະເທດທີ່ໃຫ້ບໍລິການ'),
    },
  ],
  featuredProjects: [
    {_type: 'reference', _ref: 'project-green-coffee'},
    {_type: 'reference', _ref: 'project-bcel-landing'},
    {_type: 'reference', _ref: 'project-lao-fresh'},
  ],
  servicesHeading: locStr('What We Do', 'สิ่งที่เราทำ', 'ສິ່ງທີ່ເຮົາເຮັດ'),
  ctaHeading: locStr("Let's Build Something Great Together", 'มาสร้างสิ่งที่ยิ่งใหญ่ด้วยกัน', 'ມາສ້າງສິ່ງທີ່ຍິ່ງໃຫຍ່ຮ່ວມກັນ'),
  ctaText: locStr(
    'Have a project in mind? We\'d love to hear about it.',
    'มีโปรเจกต์ในใจไหม? เราอยากได้ยินเรื่องราวของคุณ',
    'ມີໂຄງການໃນໃຈບໍ? ເຮົາຢາກໄດ້ຟັງ.',
  ),
} as const

const ABOUT_PAGE = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  heading: locStr('We are DotDeep Design', 'เราคือ DotDeep Design', 'ພວກເຮົາຄື DotDeep Design'),
  vision: locBlocks(
    'To be the leading creative studio in Southeast Asia — making world-class design accessible to businesses in Laos and the region.',
    'เป็นสตูดิโอสร้างสรรค์ชั้นนำในเอเชียตะวันออกเฉียงใต้ที่ทำให้การออกแบบระดับโลกเข้าถึงได้',
    'ເປັນ Creative Studio ຊັ້ນນຳໃນອາຊີຕາເວັນອອກສຽງໃຕ້ - ເຮັດໃຫ້ການອອກແບບລະດັບໂລກເຂົ້າເຖິງໄດ້.',
  ),
  mission: locBlocks(
    'We craft purposeful design that helps businesses grow — combining strategy, creativity, and technology to create brands and digital products that stand out and connect with people.',
    'เราสร้างงานดีไซน์ที่มีจุดประสงค์เพื่อช่วยให้ธุรกิจเติบโต ผสมผสานกลยุทธ์ ความคิดสร้างสรรค์ และเทคโนโลยี',
    'ເຮົາສ້າງການອອກແບບທີ່ມີຈຸດປະສົງ ຊ່ວຍໃຫ້ທຸລະກິດເຕີບໂຕ - ລວມຍຸດທະສາດ, ຄວາມຄິດສ້າງສັນ ແລະ ເທັກໂນໂລຈີ.',
  ),
  story: locBlocks(
    'DotDeep was born in Vientiane, Laos in 2022 with a simple belief: Lao businesses deserve great design. What started as a two-person freelance team has grown into a full creative studio serving clients across Laos, Thailand, and beyond.',
    'DotDeep เกิดขึ้นในเวียงจันทน์ ลาว ในปี 2022 ด้วยความเชื่อง่ายๆ ว่า ธุรกิจลาวสมควรได้รับการออกแบบที่ดี',
    'DotDeep ເກີດຂຶ້ນໃນວຽງຈັນ, ລາວ ໃນປີ 2022 ດ້ວຍຄວາມເຊື່ອ: ທຸລະກິດລາວສົມຄວນໄດ້ອອກແບບທີ່ດີ.',
  ),
  techStack: [
    'Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'After Effects', 'Premiere Pro',
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity CMS',
    'Vercel', 'Node.js',
  ],
} as const

const SETTINGS = {
  _id: 'settings',
  _type: 'settings',
  title: 'DotDeep Design',
  description: 'Creative studio from Laos — Graphic Design, Web Development, UI/UX & Video',
  contactEmail: 'dotdeep@gmail.com',
  contactPhone: '+856 20 5981 4656',
  address: locStr(
    'Vientiane, Laos PDR',
    'เวียงจันทน์, สปป ลาว',
    'ວຽງຈັນ, ສປປ ລາວ',
  ),
  socialLinks: {
    facebook: 'https://facebook.com/Dotdeep-Design',
    whatsapp: 'https://wa.me/8562059814656',
    line: '@dotdeep-design',
  },
} as const

const TESTIMONIALS = [
  {
    _id: 'testimonial-green-coffee',
    _type: 'testimonial',
    name: 'Bounma Keovichith',
    company: 'Green Leaf Coffee',
    quote: locStr(
      'DotDeep transformed our brand completely. Our new identity feels premium and our customers noticed immediately.',
      'DotDeep เปลี่ยนแปลงแบรนด์เราอย่างสิ้นเชิง เอกลักษณ์ใหม่รู้สึก Premium และลูกค้าสังเกตเห็นทันที',
      'DotDeep ປ່ຽນແປງແບຣນຂອງເຮົາຢ່າງສົມບູນ. ເອກະລັກໃໝ່ຮູ້ສຶກ Premium ແລະ ລູກຄ້າສັງເກດເຫັນທັນທີ.',
    ),
    rating: 5,
    order: 1,
  },
  {
    _id: 'testimonial-lotus',
    _type: 'testimonial',
    name: 'Viengkham Phommasone',
    company: 'Lotus Spa Vientiane',
    quote: locStr(
      'The website captures our brand perfectly. Professional team, great communication, and delivered on time.',
      'เว็บไซต์สะท้อนแบรนด์เราได้อย่างสมบูรณ์แบบ ทีมมืออาชีพ สื่อสารดี และส่งมอบตรงเวลา',
      'ເວັບໄຊທ໌ສະท้ อนแบรnด์ขของเราไดอย่สมบูรณ์. ທີ່ມ Mืออา ชีProfessional ส่งมอบตรงเวลา.',
    ),
    rating: 5,
    order: 2,
  },
  {
    _id: 'testimonial-laotec',
    _type: 'testimonial',
    name: 'Sengphet Oudomsine',
    company: 'LaoTec Co., Ltd.',
    quote: locStr(
      'Our users love the new dashboard design. It simplified complex workflows and our team is much more productive.',
      'ผู้ใช้ของเราชอบการออกแบบ Dashboard ใหม่มาก มันทำให้ Workflow ซับซ้อนกลายเป็นเรื่องง่าย',
      'ຜູ້ໃຊ້ຂອງເຮົາຮັກການອອກແບບ Dashboard ໃໝ່. ມັນ​ເຮັດ​ໃຫ້​ Workflow​ ທີ່​ຊັ​ບ​ຊ້ອນ​ ​ງ່າຍ​ຂຶ້ນ.',
    ),
    rating: 5,
    order: 3,
  },
]

// ─── Main ────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n🌱  Seeding DotDeep Design data...`)
  console.log(`   Project: ${projectId}  |  Dataset: ${dataset}\n`)

  const transaction = client.transaction()

  // Services
  for (const service of SERVICES) {
    transaction.createOrReplace(service)
  }
  console.log(`✓  ${SERVICES.length} services`)

  // Pricing items
  for (const item of PRICING) {
    transaction.createOrReplace(item)
  }
  console.log(`✓  ${PRICING.length} pricing items`)

  // Team
  for (const member of TEAM) {
    transaction.createOrReplace(member)
  }
  console.log(`✓  ${TEAM.length} team members`)

  // Projects
  for (const project of PROJECTS) {
    transaction.createOrReplace(project as any)
  }
  console.log(`✓  ${PROJECTS.length} projects`)

  // Testimonials
  for (const testimonial of TESTIMONIALS) {
    transaction.createOrReplace(testimonial)
  }
  console.log(`✓  ${TESTIMONIALS.length} testimonials`)

  // Singletons
  transaction.createOrReplace(HOMEPAGE as any)
  transaction.createOrReplace(ABOUT_PAGE as any)
  transaction.createOrReplace(SETTINGS as any)
  console.log(`✓  Singletons (homePage, aboutPage, settings)`)

  await transaction.commit()
  console.log(`\n✅  Seed complete! Open your Studio to review the content.\n`)
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message)
  process.exit(1)
})
