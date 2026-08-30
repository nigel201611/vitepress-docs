// 16 均衡串：X和Y个数相同为均衡串,把给定均衡串分割成均衡子串的最大个数

function main(s) {
  let x = 0
  let y = 0
  let count = 0
  for (const ch of s) {
    if (ch === 'X') {
      x++
    } else {
      y++
    }
    if (x === y) {
      count++
    }
  }
  return count
}

console.log(main('XXYYXY'))
