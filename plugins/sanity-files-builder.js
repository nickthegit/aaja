export default (context, inject) => {
  const projectId = process.env.SANITY_ID || 'ycpbe8x2'
  const dataset = process.env.SANITY_DATASET || 'production'

  const sanityFileUrl = (fileAsset) => {
    if (!fileAsset?.asset?._ref) {
      console.warn('sanityFileUrl: missing asset._ref', fileAsset)
      return ''
    }
    const baseUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}`
    const parts = fileAsset.asset._ref.split('-')
    if (parts.length < 3) {
      console.warn('sanityFileUrl: unexpected file reference format', fileAsset.asset._ref)
      return ''
    }
    const [, id, extension] = parts
    return `${baseUrl}/${id}.${extension}`
  }

  inject('getFileAsset', sanityFileUrl)
}
