import imageUrlBuilder from '@sanity/image-url'

export default ({ $sanity }, inject) => {
  const builder = imageUrlBuilder($sanity.config)
  function urlFor(
    source,
    grayscale,
    square,
    percentageOfViewportWidth,
    percentageOfViewportWidthMobile
  ) {
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
      mobile = {},
      desktopBlur,
      mobileBlur,
      v_width = percentageOfViewportWidth ? percentageOfViewportWidth : 100,
      v_width_mobile = percentageOfViewportWidthMobile
        ? percentageOfViewportWidthMobile
        : v_width,
      gs = grayscale ? -100 : 0
    // return builder.image(source).auto('format')
    desktopSizes.map((size) => {
      let img = builder
        .image(source)
        .width((v_width / 100) * size)
        .quality(80)
        .auto('format')
      if (square) {
        img = img.height((v_width / 100) * size)
      }
      if (gs != 0) {
        img = img.saturation(gs)
      }
      desktop[size] = img.url()
    })
    mobileSizes.map((size) => {
      let img = builder
        .image(source)
        .width((v_width_mobile / 100) * size)
        .height(size)
        .quality(80)
        .auto('format')
      if (square) {
        img = img.height((v_width_mobile / 100) * size)
      }
      if (gs != 0) {
        img = img.saturation(gs)
      }
      mobile[size] = img.url()
    })
    let blurImg = builder
      .image(source)
      .width(80)
      .quality(10)
      .auto('format')
      .blur(60)
    if (square) {
      blurImg = blurImg.height(80)
    }
    if (gs != 0) {
      blurImg = blurImg.saturation(gs)
    }
    desktopBlur = blurImg.url()
    mobileBlur = blurImg.url()

    return { desktop, mobile, desktopBlur, mobileBlur }
    // return { desktop, mobile, desktopBlur, mobileBlur }
  }
  inject('urlForSquare', urlFor)
}
