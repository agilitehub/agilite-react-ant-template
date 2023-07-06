export const copyToClipboard = (text) => {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      reject(new Error('Clipboard API not supported'))
      return
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}
