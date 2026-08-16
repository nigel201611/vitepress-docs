// 给定三个字符串 s1、s2、s3，请你帮忙验证 s3 是否是由 s1 和 s2 交错 组成的。
// 交错：s1 和 s2 按顺序取出字符拼接，两个字符串的子串之间可以任意交替穿插，且 s1、s2 中的字符都要用完。

// 思路：二维动态规划
// dp[i][j] 表示 s1 的前 i 个字符和 s2 的前 j 个字符能否交错组成 s3 的前 i+j 个字符。
// 转移：s3 的第 i+j 个字符（下标 i+j-1）只能来自两种情况：
// 1. 来自 s1：s1[i-1] === s3[i+j-1] 且 dp[i-1][j] 为 true
// 2. 来自 s2：s2[j-1] === s3[i+j-1] 且 dp[i][j-1] 为 true
// 初始：dp[0][0] = true；第一行/第一列单独判断前缀是否匹配。
// 剪枝：s1.length + s2.length !== s3.length 时直接返回 false。

var isInterleave = function (s1, s2, s3) {
  const m = s1.length
  const n = s2.length
  if (m + n !== s3.length) return false
  const dp = new Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) continue
      if (i > 0) {
        // 用 dp[j] 保存的是上一行（i-1）的结果，先处理来自 s1 的转移
        dp[j] = dp[j] && s1[i - 1] === s3[i + j - 1]
      } else {
        // 第一行只能来自 s2，直接清掉上一行的残留值
        dp[j] = false
      }
      if (j > 0 && s2[j - 1] === s3[i + j - 1] && dp[j - 1]) {
        dp[j] = true
      }
    }
  }
  return dp[n]
}

console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac')) // true
console.log(isInterleave('aabcc', 'dbbca', 'aadbbbaccc')) // false
console.log(isInterleave('', '', '')) // true
