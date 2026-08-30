// 报数游戏
function main(input) {
  let num = parseInt(input)
  if (num <= 1 || num >= 100) {
    return 'ERROR!'
  }
  let map = new Map()
  for (let i = 1; i < 101; i++) {
    map.set(i, i)
  }
  let start = 1
  while (map.size >= num) {
    for (let [key, value] of map.entries()) {
      if (start === num) {
        map.delete(key)
        start = 1
      } else {
        start++
      }
    }
  }

  let sb = ''
  for (let value of map.values()) {
    sb += value + ','
  }

  return sb
}

console.log(main(4))
