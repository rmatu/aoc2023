import { readFile } from 'fs/promises'
import { join } from 'path'

const objectMapping = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

const reverseObjectMapping = {
  eno: 1,
  owt: 2,
  eerht: 3,
  ruof: 4,
  evif: 5,
  xis: 6,
  neves: 7,
  thgie: 8,
  enin: 9,
}

const regex = new RegExp(`(one|two|three|four|five|six|seven|eight|nine)`, 'g')
const reverseRegex = new RegExp(`(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)`, 'g')

const replaceWithMappedValues = (input) => {
  return input.replace(regex, (match) => objectMapping[match])
}

const replaceWithMappedValuesReversed = (input) => {
  return input.replace(reverseRegex, (match) => reverseObjectMapping[match])
}

export const main = async () => {
  const startTime = performance.now()

  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let result = 0

  fileResult.split('\n').forEach((line) => {
    const x = replaceWithMappedValues(line)
      .split('')
      .filter((char) => Number(char))
      .map(Number)

    const y = replaceWithMappedValuesReversed(line.split('').reverse().join(''))
      .split('')
      .filter((char) => Number(char))
      .map(Number)

    const firstNumber = x.at(0)
    const lastNumber = y.at(0) ?? firstNumber

    result += Number(`${firstNumber}${lastNumber}`)
  })

  const endTime = performance.now()
  const timeElapsed = endTime - startTime
  console.log(`Time elapsed: ${timeElapsed}ms`)
  console.log(result)
}
