import { readLines } from '../utils'

export const main = async () => {
  const fileResult = await readLines('day1/input.txt')
  let result = 0

  for (const line of fileResult) {
    const numbers = line
      .split('')
      .filter((char) => Number(char))
      .map(Number)

    const firstNumber = numbers[0]
    const lastNumber = numbers[numbers.length - 1] ?? numbers[0]

    result += Number(`${firstNumber}${lastNumber}`)
  }

  console.log(result)
}
