// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

// 思路：动态规划
// dp[i] 表示 s 的前 i 个字符（s[0..i-1]）能否被拆分成字典中的单词。
// 转移：遍历拆分点 j（0 <= j < i），如果 dp[j] 为 true 且 s.slice(j, i) 在字典中，则 dp[i] = true。
// dp[i] = dp[j] && wordSet.has(s.substring(j, i))，对任意一个 j 成立即可。
// 初始：dp[0] = true（空串可以被拆分）。

var wordBreak = function (s, wordDict) {
  const n = s.length
  const wordSet = new Set(wordDict)
  const dp = new Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}

console.log(wordBreak('leetcode', ['leet', 'code'])) // true
console.log(wordBreak('applepenapple', ['apple', 'pen'])) // true
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])) // false
