// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
// 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
// 注意：对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。如果 s 中存在这样的子串，我们保证它是唯一的答案。

// 思路：滑动窗口（双指针）
// need 记录 t 中每个字符还缺多少，missing 记录还缺几种字符（初始为 need.size）。
// 右指针不断右移扩张窗口：遇到 need 中的字符，need[ch]--，减到 0 时 missing--。
// 当 missing === 0（窗口已覆盖 t 的全部字符）时，尝试收缩左指针：
//   先记录当前窗口长度更新答案，再把左指针字符放回 need（need[leftCh]++，>0 时 missing++），左移。
// 这样每个字符最多被左右指针各访问一次，O(n)。

var minWindow = function (s, t) {
  if (s.length < t.length) return ''
  const need = new Map()
  for (const ch of t) {
    need.set(ch, (need.get(ch) || 0) + 1)
  }
  let missing = need.size

  let left = 0
  let minLen = Infinity
  let minStart = 0

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]
    if (need.has(ch)) {
      need.set(ch, need.get(ch) - 1)
      if (need.get(ch) === 0) missing--
    }
    while (missing === 0) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1
        minStart = left
      }
      const leftCh = s[left]
      if (need.has(leftCh)) {
        need.set(leftCh, need.get(leftCh) + 1)
        if (need.get(leftCh) > 0) missing++
      }
      left++
    }
  }
  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen)
}

console.log(minWindow('ADOBECODEBANC', 'ABC')) // "BANC"
console.log(minWindow('a', 'a')) // "a"
console.log(minWindow('a', 'aa')) // ""
