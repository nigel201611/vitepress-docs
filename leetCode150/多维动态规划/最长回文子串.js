// 给你一个字符串 s，找到 s 中最长的回文子串。
// 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

// 方法一：中心扩展（O(n²)，空间 O(1)，推荐）
// 回文串关于中心对称，中心有两种：单个字符（奇数长度）和两个相同字符（偶数长度）。
// 遍历每个位置作为中心，向两边扩展，记录最长回文子串的起止位置。
// 一个长度为 n 的字符串共有 2n - 1 个中心，总复杂度 O(n²)。

// 方法二：动态规划（O(n²)，空间 O(n²)）
// dp[i][j] 表示 s[i..j] 是否为回文串。
// dp[i][j] = (s[i] === s[j]) && (j - i <= 2 || dp[i+1][j-1])
// 注意按子串长度从小到大遍历，保证 dp[i+1][j-1] 先被计算。

var longestPalindrome = function (s) {
  const n = s.length
  let start = 0
  let maxLen = 1

  const expand = (left, right) => {
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--
      right++
    }
    // 退出循环时 left/right 已越界或不等，实际回文区间是 (left+1, right-1)
    const len = right - left - 1
    if (len > maxLen) {
      start = left + 1
      maxLen = len
    }
  }

  for (let i = 0; i < n; i++) {
    expand(i, i) // 奇数长度中心
    expand(i, i + 1) // 偶数长度中心
  }
  return s.substring(start, start + maxLen)
}

console.log(longestPalindrome('babad')) // "bab" 或 "aba"
console.log(longestPalindrome('cbbd')) // "bb"
