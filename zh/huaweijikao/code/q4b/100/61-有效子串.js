// 61 有效子串: 判定 S 是否为 L 的有效子串(按序不连续匹配), 输出 S 最后一个有效字符在 L 中的位置
// 输入: S, L

function main(S, L) {
  let i = 0
  let last = -1
  for (let j = 0; j < L.length && i < S.length; j++) {
    if (L[j] === S[i]) {
      last = j
      i++
    }
  }
  return i === S.length ? last : -1
}

console.log(main('ace', 'abcde'))

// 非有效子串示例
console.log(main('aec', 'abcde'))
