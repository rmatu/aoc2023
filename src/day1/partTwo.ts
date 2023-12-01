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
const numberMappings = Object.keys(objectMapping)

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let result = 0

  fileResult.split('\n').forEach((line) => {
    const splittedLine = line
      .split(/(\d+)/)
      .filter((value) => value !== '')
      .map((value) => {
        if (Number(value)) return Number(value)

        return value
      })

    let firstNumber
    let lastNumber

    for (const value of splittedLine) {
      firstNumber = findFirstNumber(value)
      if (firstNumber) break
    }

    const reversedSplittedLine = [...splittedLine].reverse()

    for (const value of reversedSplittedLine) {
      lastNumber = findLastNumber(value)
      if (lastNumber) break
    }

    result += Number(`${firstNumber}${lastNumber}`)
  })

  console.log(result)
}

const findFirstNumber = (value: string | number) => {
  if (Number(value) || typeof value === 'number') return Number(String(value)[0])

  let result
  let stop = false

  for (let charIdx = 0; charIdx <= value.length; charIdx++) {
    if (stop) break

    const text = value.slice(0, charIdx)

    for (let number of numberMappings) {
      if (text.includes(number)) {
        result = number
        stop = true
        break
      }
    }
  }

  return objectMapping[result]
}

const findLastNumber = (value: string | number) => {
  if (Number(value) || typeof value === 'number')
    return Number(String(value)[String(value).length - 1])

  let result
  let stop = false

  for (let charIdx = value.length; charIdx >= 0; charIdx--) {
    if (stop) break

    const text = value.slice(charIdx, value.length)

    for (let number of numberMappings) {
      if (text.includes(number)) {
        result = number
        stop = true
        break
      }
    }
  }

  return objectMapping[result]
}
