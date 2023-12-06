import { readLines } from '../utils'

const specialCharacters = ['@', '*', '$', '&', '/', '=', '-', '+', '#', '%']

export const main = async () => {
  const startTime = performance.now()
  const fileResult = await readLines('day3/input.txt')

  let result = 0

  const array2D = createMarks(fileResult)
  // console.log(array2D)

  for (let lineIdx = 0; lineIdx < fileResult.length; lineIdx++) {
    const line = fileResult[lineIdx]

    const resultArray = line
      .split(/(\d+|\D)/)
      .filter(Boolean)
      .map((element) => (isNaN(element) ? element : Number(element)))

    const lineIdxs = splitStringWithIndexes(line)

    for (let charIdx = 0; charIdx < resultArray.length; charIdx++) {
      if (Number(resultArray[charIdx])) {
        const currNumber = resultArray[charIdx]
        const currNumberIndexes = lineIdxs.numberIndexes.find((el) => el.number === currNumber)
        if (!currNumberIndexes) continue

        for (let i = currNumberIndexes.start; i <= currNumberIndexes.end; i++) {
          if (array2D[lineIdx][i] === 'x') {
            result += Number(currNumber)
            break
          }
        }
      }
    }
  }

  const endTime = performance.now()
  const timeElapsed = endTime - startTime
  console.log(`Time elapsed: ${timeElapsed}ms`)
  console.log({ result })
}

const createMarks = (fileResult: string[]) => {
  const array2D: string[][] = new Array(fileResult.length)
    .fill([])
    .map(() => new Array(fileResult[0].length).fill(' '))

  for (let lineIdx = 0; lineIdx < fileResult.length; lineIdx++) {
    const line = fileResult[lineIdx]

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx]

      if (specialCharacters.includes(char)) {
        if (lineIdx - 1 < 0) continue
        if (charIdx - 1 < 0) continue
        if (charIdx + 1 > line.length) continue
        if (lineIdx + 1 > fileResult.length) continue

        array2D[lineIdx - 1][charIdx - 1] = 'x'
        array2D[lineIdx - 1][charIdx] = 'x'
        array2D[lineIdx - 1][charIdx + 1] = 'x'
        array2D[lineIdx][charIdx + 1] = 'x'
        array2D[lineIdx][charIdx - 1] = 'x'
        array2D[lineIdx + 1][charIdx + 1] = 'x'
        array2D[lineIdx + 1][charIdx + 1] = 'x'
        array2D[lineIdx + 1][charIdx] = 'x'
        array2D[lineIdx + 1][charIdx - 1] = 'x'
      }
    }
  }

  return array2D
}

interface NumberIndex {
  start: number
  end: number
  number: number
}

interface SplitResult {
  arr: (number | string)[]
  numberIndexes: NumberIndex[]
}

function splitStringWithIndexes(inputString: string): SplitResult {
  const resultArray: (number | string)[] = []
  const numberIndexes: NumberIndex[] = []
  let currentNumber = ''

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i]

    if (/\d/.test(char)) {
      currentNumber += char
    } else {
      if (currentNumber !== '') {
        resultArray.push(Number(currentNumber))
        numberIndexes.push({
          start: i - currentNumber.length,
          end: i - 1,
          number: Number(currentNumber),
        })
        currentNumber = ''
      }

      resultArray.push(char)
    }
  }

  if (currentNumber !== '') {
    resultArray.push(Number(currentNumber))
    numberIndexes.push({
      start: inputString.length - currentNumber.length,
      end: inputString.length - 1,
      number: Number(currentNumber),
    })
  }

  return { arr: resultArray, numberIndexes }
}
