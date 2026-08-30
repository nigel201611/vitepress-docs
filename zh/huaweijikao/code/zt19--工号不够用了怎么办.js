// 工号不够用了怎么办
function main(peopleNum, charSize) {
  // peopleNum 需要分配的人数
  // charSize 新工号英文字母的长度
  let num1 = Math.pow(26, charSize)
  let i = 1 // 至少一位数字 （0-9），增加一位数字，可以和 字母组合，新增10倍
  let num2 = num1 * 10
  while (num2 < peopleNum) {
    i++
    num2 *= 10
  }

  return i
}

console.log(main(2600, 1))
