// 59 最小字符串: 最多交换一次任意两个不同位置的字符, 得到字典序最小的字符串
// 输入: 小写字母字符串 s

function main(s) {
  const n = s.length
  for (let i = 0; i < n; i++) {
    let minChar = s[i]
    for (let j = i + 1; j < n; j++) {
      if (s[j] < minChar) minChar = s[j]
    }
    if (minChar < s[i]) {
      // 与最靠右的最小字符交换
      const arr = s.split('')
      let j = n - 1
      while (arr[j] !== minChar) j--
      const t = arr[i]
      arr[i] = arr[j]
      arr[j] = t
      return arr.join('')
    }
  }
  return s
}

console.log(main('abcdef'))

// 交换示例
console.log(main('cbad'))
