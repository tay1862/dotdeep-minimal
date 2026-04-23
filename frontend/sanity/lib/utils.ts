import {Link} from '@/sanity.types'
import {buildLocalePath, sanitizeExternalUrl} from '@/app/lib/urls'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {DereferencedLink} from '@/sanity/lib/types'

const builder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

// Create an image URL builder using the client
// Export a function that can be used to get image URLs
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

export function resolveOpenGraphImage(
  image?: SanityImageSource | null,
  width = 1200,
  height = 627,
) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return {url, alt: (image as {alt?: string})?.alt || '', width, height}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(
  link: Link | DereferencedLink | undefined,
  locale = 'en',
) {
  if (!link) return null

  const linkType = link.linkType || (link.href ? 'href' : undefined)

  switch (linkType) {
    case 'href':
      return sanitizeExternalUrl(link.href) || null
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return buildLocalePath(locale, `/${link.page}`)
      }
      return null
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return buildLocalePath(locale, `/posts/${link.post}`)
      }
      return null
    default:
      return null
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
