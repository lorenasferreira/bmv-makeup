import metadata from "../../../data/image-metadata.json";

function OptimizedImage({ src, alt, sizes = "100vw", loading = "lazy", ...props }) {
  const image = metadata[src];
  const sources = image?.variants?.length
    ? [...image.variants.map(variant => `${variant.src} ${variant.width}w`), `${src} ${image.width}w`].join(", ")
    : undefined;

  return (
    <img
      src={src}
      alt={alt}
      width={image?.width}
      height={image?.height}
      srcSet={sources}
      sizes={sources ? sizes : undefined}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}

export default OptimizedImage;
