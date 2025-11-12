const colors = [
  '#ffabfb', // color-purple
  '#d993e0', // color-dark-purple
  '#ffd150', // color-yellow
  '#ffef85', // color-light-yellow
  '#ffffff', // color-light
]

const getRandomColors = (arrLength) => {
  let result = []
  for (let i = 0; i < arrLength; i += 1) {
    const index = Math.floor(Math.random() * colors.length)
    result.push(colors[index])
  }
  console.log(result)
  return result
}

export default getRandomColors
