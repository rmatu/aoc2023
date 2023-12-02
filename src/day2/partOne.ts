import { readLines } from '../utils'

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

export const main = async () => {
  const startTime = performance.now()
  const fileResult = await readLines('day2/input.txt')
  let result = 0

  for (let idx = 0; idx < fileResult.length; idx++) {
    const line = fileResult[idx]
    const passed = splitGames(line)

    if (passed) {
      result += idx + 1
    }
  }

  const endTime = performance.now()
  const timeElapsed = endTime - startTime
  console.log(`Time elapsed: ${timeElapsed}ms`)
  console.log({ result })
}

const splitGames = (input: string) => {
  const withoutGame = input.replace(/\bGame \d+\b:?|\b:\b/g, '')
  const splitted = withoutGame.split(';')
  let passed = false

  for (const set of splitted) {
    const blueCount = getColorCount(set, 'blue')
    const redCount = getColorCount(set, 'red')
    const greenCount = getColorCount(set, 'green')

    if (blueCount <= MAX_BLUE && redCount <= MAX_RED && greenCount <= MAX_GREEN) {
      passed = true
    } else {
      passed = false
      break
    }
  }

  return passed
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
