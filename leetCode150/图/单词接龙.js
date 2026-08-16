// 字典 wordList 中从单词 beginWord 到 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 -> s2 -> ... -> sk：
// 每一对相邻的单词只差一个字母。对于 1 <= i <= k 时，每个 si 都在 wordList 中。sk == endWord，且 beginWord 无需在 wordList 中。
// 返回从 beginWord 到 endWord 的 最短转换序列中的单词数目 。如果不存在这样的转换序列，返回 0。

// 思路：BFS 求最短路径长度
// 单词长度 L，每个单词的邻居 = 将任意一位替换为 a-z 中 25 个其他字母得到的单词中在 wordList 里的那些。
// 从 beginWord 开始 BFS（带层数），首次到达 endWord 的层数 + 1 就是答案（因为要算上起始单词）。
// 每次扩展最多 26 × L 个候选，O(L × 26 × wordList 大小)。

var ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList)
  if (!wordSet.has(endWord)) return 0

  const visited = new Set([beginWord])
  const queue = [[beginWord, 1]]

  while (queue.length) {
    const [word, level] = queue.shift()
    if (word === endWord) return level
    for (let i = 0; i < word.length; i++) {
      for (let c = 0; c < 26; c++) {
        const ch = String.fromCharCode(97 + c)
        if (word[i] === ch) continue
        const next = word.slice(0, i) + ch + word.slice(i + 1)
        if (wordSet.has(next) && !visited.has(next)) {
          visited.add(next)
          queue.push([next, level + 1])
        }
      }
    }
  }
  return 0
}

console.log(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])) // 5
console.log(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])) // 0
