import { imageSrc } from '../utils/constants';

interface OptimizedImageProps {
  /** Base filename WITHOUT extension (e.g. 'london', 'founder') */
  name: string;
  /** Alt text for the image */
  alt: string;
  /** Image extension for fallback — defaults to 'jpg' */
  ext?: 'jpg' | 'jpeg' | 'png';
  /** Additional CSS classes */
  className?: string;
  /** HTML sizes attribute for responsive images */
  sizes?: string;
  /** Whether to skip the <picture> wrapper and just use a plain <img> with srcset */
  noPicture?: boolean;
  /** Extra props forwarded to the <img> element */
  imgProps?: Record<string, string>;
}

const SRC_SET_WIDTHS = [400, 800, 1200];

/**
 * OptimizedImage
 *
 * Renders a <picture> element with:
 *  - WebP sources   (srcset: 400w, 800w, 1200w + original)
 *  - JPEG/PNG fallback (srcset: 400w, 800w, 1200w + original)
 *  - Responsive sizes attribute
 *
 * The variants are generated at build time by scripts/optimize-images.mjs.
 */
const OptimizedImage = ({
  name,
  alt,
  ext = 'jpg',
  className = '',
  sizes = '100vw',
  noPicture = false,
  imgProps = {},
}: OptimizedImageProps) => {
  const originExt = ext;
  const originSrc = imageSrc(`${name}.${originExt}`);

  // Build srcset strings
  const webpSrcset = SRC_SET_WIDTHS
    .map((w) => `${imageSrc(`${name}-${w}w.webp`)} ${w}w`)
    .join(', ');

  const fallbackSrcset = SRC_SET_WIDTHS
    .map((w) => `${imageSrc(`${name}-${w}w.${originExt}`)} ${w}w`)
    .join(', ');

  const imgElement = (
    <img
      src={originSrc}
      srcSet={fallbackSrcset}
      sizes={sizes}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...imgProps}
    />
  );

  if (noPicture) {
    return imgElement;
  }

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={
          webpSrcset
            ? `${webpSrcset}, ${imageSrc(`${name}.webp`)} ${SRC_SET_WIDTHS[SRC_SET_WIDTHS.length - 1] + 1}w`
            : imageSrc(`${name}.webp`)
        }
        sizes={sizes}
      />
      <source
        type={originExt === 'png' ? 'image/png' : 'image/jpeg'}
        srcSet={fallbackSrcset}
        sizes={sizes}
      />
      {imgElement}
    </picture>
  );
};

export default OptimizedImage;
