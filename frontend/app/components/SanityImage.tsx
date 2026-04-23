import Image from 'next/image'
import type {ImageUrlBuilderOptions, SanityImageSource} from '@sanity/image-url'

import {urlForImage} from '@/sanity/lib/utils'

interface SanityImageProps {
  source?: SanityImageSource | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  fit?: ImageUrlBuilderOptions['fit']
}

export default function SanityImage({
  source,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes,
  quality = 85,
  fit = 'max',
}: SanityImageProps) {
  if (!source) return null

  const imageBuilder = urlForImage(source)
    .auto('format')
    .quality(quality)

  if (!fill && width) {
    imageBuilder.width(width)
  }

  if (!fill && height) {
    imageBuilder.height(height)
  }

  imageBuilder.fit(fit)

  const url = imageBuilder.url()

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  )
}
