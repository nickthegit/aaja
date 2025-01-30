export default (context, inject) => {
  const sanityFileUrl = (fileAsset) => {
    const baseUrl = `https://cdn.sanity.io/files/ycpbe8x2/production`
    const parts = fileAsset.asset._ref.split('-')
    if (parts.length < 3) {
      throw new Error('Invalid Sanity file reference')
    }
    const [, id, extension] = parts
    return `${baseUrl}/${id}.${extension}`
  }

  inject('getFileAsset', sanityFileUrl)
}
