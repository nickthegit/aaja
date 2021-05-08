export const cloudinaryHeroParser = (img_string) => {
  let landscape = {},
    portrait = {}
  let landscapeSizes = [
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
  let portraitSizes = [400, 600, 800, 1000, 1200, 1400, 1600, 1800]
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
  let landscapeBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_16:9,c_fill,g_auto/v`
  )
  let portraitBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_9:16,c_fill,g_auto/v`
  )

  return { landscape, portrait, landscapeBlur, portraitBlur }
}

export const cloudinaryImgParser = (
  img_string,
  ratio,
  // percentageW,
  ratio_Mobile
  // percentageW_Mobile
) => {
  let defaults = {
    ratio: '2:1',
    percentageW: 100,
  }
  let desktop = {},
    mobile = {},
    r = ratio ? ratio : defaults.ratio,
    rM = ratio_Mobile ? ratio_Mobile : r
  // p = percentageW ? percentageW : defaults.percentageW
  // pM = percentageW_Mobile ? percentageW_Mobile : p
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
  desktopSizes.map((size) => {
    desktop[size] = img_string.replace(
      `upload/v`,
      `upload/f_auto,w_${size},ar_${r},c_fill,g_auto/v`
    )
  })
  mobileSizes.map((size) => {
    mobile[size] = img_string.replace(
      `upload/v`,
      `upload/f_auto,w_${size},ar_${rM},c_fill,g_auto/v`
    )
  })
  let desktopBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_${r},c_fill,g_auto/v`
  )
  let mobileBlur = img_string.replace(
    `upload/v`,
    `upload/f_auto,w_80,e_blur:800,q_10,ar_${rM},c_fill,g_auto/v`
  )

  return { desktop, mobile, desktopBlur, mobileBlur }
}
