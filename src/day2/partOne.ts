import { readLines } from '../utils'

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

export const main = async () => {
  const fileResult = await readLines('day2/input.txt')
  let result = 0

  for (let idx = 0; idx < fileResult.length; idx++) {
    const line = fileResult[idx]

    const blueCount = getColorCount(line, 'blue')
    const redCount = getColorCount(line, 'red')
    const greenCount = getColorCount(line, 'green')

    console.log(line)
    console.log({ redCount, greenCount, blueCount })

    if (redCount <= MAX_RED && greenCount <= MAX_GREEN && blueCount <= MAX_BLUE) {
      console.log('Game ID:' + (idx + 1))
      result += idx + 1
    }
  }

  console.log(result)
}

const getColorCount = (input: string, color: 'blue' | 'red' | 'green') => {
  const regex = new RegExp(`\\b(\\d+)\\s*${color}\\b`, 'g')
  const result = input.match(regex)

  if (result) {
    return result
      .map((match) => match.replace(` ${color}`, ''))
      .reduce((acc, curr) => acc + Number(curr), 0)
  }

  return 0
}
