import type { NewsImage } from '../news'

type Props = {
  image: NewsImage
  className?: string
  priority?: boolean
  sizes?: string
}

export function NewsPicture({
  image,
  className,
  priority = false,
  sizes,
}: Props) {
  const resolvedSizes = sizes ?? image.sizes

  return (
    <picture>
      <source type="image/avif" srcSet={image.avifSrcSet} sizes={resolvedSizes} />
      <source type="image/webp" srcSet={image.webpSrcSet} sizes={resolvedSizes} />
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
