import { Message } from '@/redux/message/types'

export async function downloadFile(file: Message['file']) {
  const [, extension] = file.type.split('/')

  try {
    const response = await fetch(file.url)

    if (!response.ok) {
      throw new Error('Error ao baixar o arquivo')
    }

    const blob = await response.blob()
    const filename = `${file.name}.${extension}`
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
  } catch (error) {
    console.log({ error })
  }
}
