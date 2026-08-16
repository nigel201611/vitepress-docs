// 设计一个支持以下两种操作的数据结构：
//   void addWord(word) 添加一个单词
//   boolean search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 '.' 或小写字母。
//   '.' 可以表示任何一个字母（即搜索时支持通配符）。

// 思路：Trie + 递归搜索
// addWord 与普通 Trie 插入相同。
// search 逐字符匹配，遇到 '.' 时枚举当前节点的所有子节点递归尝试，任意一条路径成功即返回 true。

class TrieNode {
  constructor() {
    this.children = new Map()
    this.isEnd = false
  }
}

var WordDictionary = function () {
  this.root = new TrieNode()
}

WordDictionary.prototype.addWord = function (word) {
  let node = this.root
  for (const ch of word) {
    if (!node.children.has(ch)) {
      node.children.set(ch, new TrieNode())
    }
    node = node.children.get(ch)
  }
  node.isEnd = true
}

WordDictionary.prototype.search = function (word) {
  const dfs = (node, index) => {
    if (index === word.length) return node.isEnd === true
    const ch = word[index]
    if (ch === '.') {
      for (const child of node.children.values()) {
        if (dfs(child, index + 1)) return true
      }
      return false
    }
    const child = node.children.get(ch)
    return child ? dfs(child, index + 1) : false
  }
  return dfs(this.root, 0)
}

const wd = new WordDictionary()
wd.addWord('bad')
wd.addWord('dad')
wd.addWord('mad')
console.log(wd.search('pad')) // false
console.log(wd.search('bad')) // true
console.log(wd.search('.ad')) // true
console.log(wd.search('b..')) // true
