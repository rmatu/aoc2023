import { readFile } from 'fs/promises'
import { join } from 'path'

export const readLines = async (fileName: string) => {
  return (await readFile(join(__dirname, `../${fileName}`), 'utf-8')).split('\n')
}
