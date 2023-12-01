import { readFile } from 'fs/promises'
import { join } from 'path'

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let result = 0

  fileResult.split('\n').forEach((line) => {
    const numbers = line
      .split('')
      .filter((char) => Number(char))
      .map(Number)

    const firstNumber = numbers[0]
    const lastNumber = numbers[numbers.length - 1] ?? numbers[0]

    result += Number(`${firstNumber}${lastNumber}`)
  })

  console.log(result)
}
