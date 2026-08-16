// Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。
// 实现 Trie 类：
//   Trie() 初始化前缀树对象
//   void insert(String word) 向前缀树中插入字符串 word
//   boolean search(String word) 如果字符串 word 在前缀树中，返回 true
//   boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix，返回 true

// 思路：每个节点存一个 children 字典 + 是否单词结尾的标记
// 插入：逐字符向下走，没有的子节点就新建
// 查找：逐字符向下走，走到头检查 isEnd
// startsWith：逐字符向下走，走不到头说明没有该前缀

var Trie = function () {
  this.root = { children: {}, isEnd: false }
}

Trie.prototype.insert = function (word) {
  let node = this.root
  for (const ch of word) {
    if (!node.children[ch]) {
      node.children[ch] = { children: {}, isEnd: false }
    }
    node = node.children[ch]
  }
  node.isEnd = true
}

Trie.prototype.search = function (word) {
  let node = this.root
  for (const ch of word) {
    if (!node.children[ch]) return false
    node = node.children[ch]
  }
  return node.isEnd === true
}

Trie.prototype.startsWith = function (prefix) {
  let node = this.root
  for (const ch of prefix) {
    if (!node.children[ch]) return false
    node = node.children[ch]
  }
  return true
}

const trie = new Trie()
trie.insert('apple')
console.log(trie.search('apple')) // true
console.log(trie.search('app')) // false
console.log(trie.startsWith('app')) // true
trie.insert('app')
console.log(trie.search('app')) // true
