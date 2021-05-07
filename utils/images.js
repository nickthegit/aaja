export const cloudinaryHeroParser = (img_string) => {
  let landscape = {}, portrait = {}
  let landscapeSizes = [400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2400, 2800, 3000]
  let portraitSizes = [400, 600, 800, 1000, 1200, 1400, 1600, 1800]
  landscapeSizes.map(size => {
    landscape[size] = img_string.replace(`upload/v`, `upload/f_auto,w_${size},ar_16:9,c_fill,g_auto/v`) 
  })
  portraitSizes.map(size => {
    portrait[size] = img_string.replace(`upload/v`, `upload/f_auto,w_${size},ar_9:16,c_fill,g_auto/v`) 
  })
  let landscapeBlur = img_string.replace(`upload/v`, `upload/f_auto,w_80,e_blur:800,q_10,ar_16:9,c_fill,g_auto/v`)
  let portraitBlur = img_string.replace(`upload/v`, `upload/f_auto,w_80,e_blur:800,q_10,ar_9:16,c_fill,g_auto/v`)

  return {landscape, portrait, landscapeBlur, portraitBlur}
}
