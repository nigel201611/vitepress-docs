// 63. 最长子串（只含 1 个字母，其余为数字）
// 输入：字符串（只包含字母和数字）
// 输出：满足条件的最长子串的长度；如全是字母或全是数字（找不到满足要求的子串）则返回 -1
function main(s) {
  const n = s.length
  let best = -1
  let lastLetter = -1
  let nextLetter = n
  const next = new Array(n).fill(n)
  for (let i = n - 1; i >= 0; i--) {
    next[i] = nextLetter // 当前位置右侧下一个字母（含自己之后）
    if (/[a-zA-Z]/.test(s[i])) nextLetter = i
  }
  for (let i = 0; i < n; i++) {
    if (/[a-zA-Z]/.test(s[i])) {
      const prev = lastLetter
      const nxt = next[i]
      const len = nxt - prev - 1 // 以该字母为唯一字母时，向两边扩到相邻字母的最长子串长度
      if (len >= 2) {
        if (len > best) best = len
      }
      lastLetter = i
    }
  }
  return best
}

console.log(main('abC124ACb'))
