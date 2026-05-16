export const cloudinaryHeroParser = (img_string) => {
  const landscape = {};
    const portrait = {}
  const landscapeSizes = [
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
  const portraitSizes = [400, 600, 800, 1000, 1200, 1400, 1600, 1800]
  landscapeSizes.map((size) => {
    landscape[size] = img_string.replace(
      `upload/v`,
      `upload/f_auto,w_${size},ar_16:9,c_fill,g_auto/v`
    )
  })
  portraitSizes.map((size) => {
    portrait[size] = img_string.replace(
      `upload/v`,
      `upload/f_auto,w_${size},ar_9:16,c_fill,g_auto/v`
    )
  })
  const landscapeBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_16:9,c_fill,g_auto/v`
  )
  const portraitBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_9:16,c_fill,g_auto/v`
  )

  return { landscape, portrait, landscapeBlur, portraitBlur }
}

export const cloudinaryImgParser = (
  img_string,
  ratio,
  ratio_Mobile,
  extraTransforms
) => {
  const defaults = {
    ratio: '2:1',
    percentageW: 100,
  }
  const desktop = {};
    const mobile = {};
    const r = ratio || defaults.ratio;
    const rM = ratio_Mobile || r
  // p = percentageW ? percentageW : defaults.percentageW
  // pM = percentageW_Mobile ? percentageW_Mobile : p
  const desktopSizes = [
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
  const mobileSizes = [400, 600, 800, 1000, 1200, 1400, 1600, 1800]
  desktopSizes.map((size) => {
    desktop[size] = img_string.replace(
      `upload/v`,
      `upload/f_auto,w_${size},ar_${r},c_fill,g_auto${
        extraTransforms ? ',' + extraTransforms : ''
      }/v`
    )
  })
  mobileSizes.map((size) => {
    mobile[size] = img_string.replace(
      `upload/v`,
      `upload/f_auto,w_${size},ar_${rM},c_fill,g_auto${
        extraTransforms ? ',' + extraTransforms : ''
      }/v`
    )
  })
  const desktopBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_${r},c_fill,g_auto${
      extraTransforms ? ',' + extraTransforms : ''
    }/v`
  )
  const mobileBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_${rM},c_fill,g_auto${
      extraTransforms ? ',' + extraTransforms : ''
    }/v`
  )

  return { desktop, mobile, desktopBlur, mobileBlur }
}
