import imageUrlBuilder from '@sanity/image-url'

export default ({ $sanity }, inject) => {
  const builder = imageUrlBuilder($sanity.config)
  function urlFor(source, grayscale) {
    let desktopSizes = [
      400,
      600,
      800,
      1000,
      1200,
      1400,
      1600,
      1800,
      2000,
      2400,
      2800,
      3000,
    ]
    let mobileSizes = [400, 600, 800, 1000, 1200, 1400, 1600, 1800]
    let desktop = {},
      mobile = {}
    // return builder.image(source).auto('format')
    desktopSizes.map((size) => {
      desktop[size] = builder
        .image(source)
        .width(size)
        .height(size)
        .quality(80)
        .saturation(grayscale ? -100 : 0)
        .auto('format')
        .url()
    })

    return { desktop }
    // return { desktop, mobile, desktopBlur, mobileBlur }
  }
  inject('urlForSquare', urlFor)
}
