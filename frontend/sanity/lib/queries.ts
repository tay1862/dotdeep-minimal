import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

export const siteSettingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    contactEmail,
    contactPhone,
    address,
    googleMapsEmbed,
    socialLinks{
      facebook,
      instagram,
      tiktok,
      whatsapp,
      line,
      linkedin
    }
  }
`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        button {
          ...,
          ${linkFields}
        }
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// ─── DotDeep Queries ────────────────────────────────────────────

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    heroHeading,
    heroSubheading,
    heroCtaText,
    heroCtaLink,
    heroImage,
    stats[]{value, suffix, label},
    "featuredProjects": featuredProjects[]->{
      _id,
      title,
      "slug": slug.current,
      category,
      coverImage,
      client,
      completedAt
    },
    servicesHeading,
    ctaHeading,
    ctaText
  }
`)

export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc, completedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    coverImage,
    client,
    description,
    techStack,
    featured,
    completedAt
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    coverImage,
    images,
    client,
    description,
    techStack,
    projectUrl,
    videoUrl,
    completedAt
  }
`)

export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    features
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    icon,
    features,
    "pricingItems": *[_type == "pricingItem" && references(^._id)] | order(order asc) {
      _id,
      name,
      price,
      currency,
      description,
      features
    }
  }
`)

export const allPricingQuery = defineQuery(`
  *[_type == "pricingItem"] | order(order asc) {
    _id,
    name,
    price,
    currency,
    description,
    features,
    "service": service->{title, "slug": slug.current}
  }
`)

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0]{
    heading,
    vision,
    mission,
    story,
    storyImage,
    techStack
  }
`)

export const allTeamQuery = defineQuery(`
  *[_type == "person"] | order(order asc) {
    _id,
    firstName,
    lastName,
    picture,
    role,
    bio,
    socialLinks
  }
`)

export const allTestimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    company,
    quote,
    avatar,
    rating
  }
`)

export const allClientLogosQuery = defineQuery(`
  *[_type == "clientLogo"] | order(order asc) {
    _id,
    name,
    logo,
    url
  }
`)

export const projectSlugs = defineQuery(`
  *[_type == "project" && defined(slug.current)]
  {"slug": slug.current}
`)

export const serviceSlugs = defineQuery(`
  *[_type == "service" && defined(slug.current)]
  {"slug": slug.current}
`)
