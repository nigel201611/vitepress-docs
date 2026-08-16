// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数。
// 你可以对一个单词进行如下三种操作：插入一个字符、删除一个字符、替换一个字符。

// 思路：二维动态规划
// dp[i][j] 表示 word1 的前 i 个字符转换成 word2 的前 j 个字符所需的最少操作数。
// 转移：考虑 word1[i-1] 和 word2[j-1]：
// 1. 相等：dp[i][j] = dp[i-1][j-1]，无需操作
// 2. 不等：取三种操作的最小值 + 1
//    - 插入：dp[i][j-1]（word2 已匹配 j-1 个，再在 word1 中插入 word2[j-1]）
//    - 删除：dp[i-1][j]（删掉 word1[i-1]）
//    - 替换：dp[i-1][j-1]
// 初始：dp[0][j] = j（空串插入 j 个字符），dp[i][0] = i（删除 i 个字符）。

var minDistance = function (word1, word2) {
  const m = word1.length
  const n = word2.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
      }
    }
  }
  return dp[m][n]
}

console.log(minDistance('horse', 'ros')) // 3: horse→rorse→rose→ros
console.log(minDistance('intention', 'execution')) // 5
