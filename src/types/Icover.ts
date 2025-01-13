export default interface Icover {
  description: string,
  imageBuffer: {
    data: Buffer,
    type: string
  }
  mime: string,
  type: {
    id: number,
    name: string
  },
}

