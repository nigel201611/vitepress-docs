// 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words， 返回所有二维网格上的单词 。
// 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成（水平或垂直相邻）。同一个单元格内的字母在一个单词中不允许被重复使用。

// 思路：Trie + 回溯
// 1. 把所有 words 插入前缀树（Trie），叶子节点存完整单词
// 2. 遍历网格每个格子作为起点，DFS 四个方向，沿着 Trie 同步前进
// 3. 走到某个节点存有单词时收集结果，并清空（防止重复收集）
// 4. 用 '#' 标记已访问，回溯时恢复
// 相比对每个单词单独 DFS，Trie 让所有单词共享前缀，只搜索一次。

class TrieNode {
  constructor() {
    this.children = new Map()
    this.word = null // 走到这里是某个单词的结尾时，存下该单词
  }
}

var findWords = function (board, words) {
  const root = new TrieNode()
  for (const word of words) {
    let node = root
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode())
      }
      node = node.children.get(ch)
    }
    node.word = word
  }

  const m = board.length
  const n = board[0].length
  const result = []

  const dfs = (r, c, node) => {
    if (r < 0 || r >= m || c < 0 || c >= n) return
    const ch = board[r][c]
    if (ch === '#') return
    const child = node.children.get(ch)
    if (!child) return

    if (child.word !== null) {
      result.push(child.word)
      child.word = null // 清空，避免重复收集同一个单词
    }

    board[r][c] = '#'
    dfs(r + 1, c, child)
    dfs(r - 1, c, child)
    dfs(r, c + 1, child)
    dfs(r, c - 1, child)
    board[r][c] = ch
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      dfs(r, c, root)
    }
  }
  return result
}

console.log(
  findWords(
    [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v'],
    ],
    ['oath', 'pea', 'eat', 'rain']
  )
) // ["oath", "eat"]
