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

const numberMappings = Object.keys(objectMapping).join('|')
const regex = new RegExp(`(${numberMappings})`, 'g')

export const main = async () => {
  const startTime = performance.now()

  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let result = 0

  fileResult.split('\n').forEach((line) => {
    const x = replaceWithMappedValues(line)
      .split('')
      .filter((char) => Number(char))
      .map(Number)

    const firstNumber = x[0]
    const lastNumber = x.at(-1) ?? firstNumber

    console.log('line:', line)
    console.log('result:', Number(`${firstNumber}${lastNumber}`))

    result += Number(`${firstNumber}${lastNumber}`)
  })

  const endTime = performance.now()
  const timeElapsed = endTime - startTime
  console.log(`Time elapsed: ${timeElapsed}ms`)
  console.log(result)
}

const replaceWithMappedValues = (input) => {
  return input.replace(regex, (match) => objectMapping[match])
}
