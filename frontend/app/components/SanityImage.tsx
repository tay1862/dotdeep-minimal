import Image from 'next/image'
import {createImageUrlBuilder} from '@sanity/image-url'
import {dataset, projectId} from '@/sanity/lib/api'

const builder = createImageUrlBuilder({projectId: projectId || '', dataset: dataset || ''})

interface SanityImageProps {
  source?: {asset?: {_ref?: string}} | null
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
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
}: SanityImageProps) {
  if (!source?.asset?._ref) return null

  const url = builder
    .image(source)
    .auto('format')
    .quality(quality)
    .url()

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
