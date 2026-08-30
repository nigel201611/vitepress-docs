// 按索引范围翻转文章片段
function main(input, nums) {
  let numArr = nums.split(' ')
  return reverseWords(input, parseInt(numArr[0]), parseInt(numArr[1]))
}
function reverseWords(str, start, end) {
  let strArr = str.split(' ')
  while (start < end) {
    let temp = ''
    temp = strArr[end]
    strArr[end] = strArr[start]
    strArr[start] = temp
    start++
    end--
  }
  let sb = ''
  for (let i = 0; i < strArr.length; i++) {
    sb += strArr[i]
    if (i + 1 < strArr.length) {
      sb += ' '
    }
  }
  return sb
}

console.log(main('I am a developer.', '0 3'))
