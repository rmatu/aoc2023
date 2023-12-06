import { readLines } from '../utils'

export const main = async () => {
  const startTime = performance.now()
  const fileResult = await readLines('day2/input.txt')
  let result = 0

  for (const line of fileResult) {
    const power = getPower(line)

    result += power
  }

  const endTime = performance.now()
  const timeElapsed = endTime - startTime
  console.log(`Time elapsed: ${timeElapsed}ms`)
  console.log({ result })
}

const getPower = (input: string) => {
  const withoutGame = input.replace(/\bGame \d+\b:?|\b:\b/g, '')
  const splitted = withoutGame.split(';')

  let maxRed = 1
  let maxBlue = 1
  let maxGreen = 1

  for (const set of splitted) {
    const blueCount = getColorCount(set, 'blue')
    const redCount = getColorCount(set, 'red')
    const greenCount = getColorCount(set, 'green')

    if (blueCount > maxBlue) {
      maxBlue = blueCount
    }

    if (redCount > maxRed) {
      maxRed = redCount
    }

    if (greenCount > maxGreen) {
      maxGreen = greenCount
    }
  }

  return maxRed * maxBlue * maxGreen
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
