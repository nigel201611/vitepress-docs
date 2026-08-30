// 60 环形字符串: 找出环中 'o' 字符出现偶数次的最长子字符串长度
// 输入: 小写字母字符串 s

function main(s) {
  let oCount = 0
  for (const ch of s) {
    if (ch === 'o') oCount++
  }
  // 若 'o' 的总数为偶数, 整个环形字符串(长度 n)即为答案;
  // 若为奇数, 去掉任意一个 'o' 所在的 1 字节位置, 剩下的环段长度为 n-1, 含偶数个 'o'
  if (oCount % 2 === 0) return s.length
  return s.length - 1
}

console.log(main('alolobo'))
