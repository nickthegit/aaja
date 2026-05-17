export default (context, inject) => {
  const sanityFileUrl = (fileAsset) => {
    const projectId = process.env.SANITY_ID || 'ycpbe8x2'
    const dataset = process.env.SANITY_DATASET || 'production'
    const baseUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}`
    const parts = fileAsset.asset._ref.split('-')
    if (parts.length < 3) {
      throw new Error('Invalid Sanity file reference')
    }
    const [, id, extension] = parts
    return `${baseUrl}/${id}.${extension}`
  }

  inject('getFileAsset', sanityFileUrl)
}
