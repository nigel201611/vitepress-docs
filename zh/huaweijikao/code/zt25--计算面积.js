// 计算面积

function main(maxX1, codes) {
  let count = codes.length
  let sqa = 0
  let tempX1 = 0
  let tempY1 = 0
  for (let i = 0; i < count; i++) {
    let str = codes[i]
    let x1New = str[0]
    sqa += (x1New - tempX1) * Math.abs(tempY1)
    tempY1 += parseInt(str[1])
    tempX1 = x1New
  }
  sqa += (maxX1 - tempX1) * tempY1
  return sqa
}

console.log(
  main(10, [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, -2]
  ])
)
