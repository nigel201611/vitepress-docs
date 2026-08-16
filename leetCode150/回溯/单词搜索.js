// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
// 同一个单元格内的字母不允许被重复使用。

// 思路：回溯（DFS + 剪枝）
// 遍历每个格子作为起点，向四个方向探索。
// 用 '#' 临时覆盖当前格子表示已访问（恢复时改回来），避免额外 visited 数组。
// 剪枝：字符不匹配直接返回；所有字符匹配完说明找到。

var exist = function (board, word) {
  const m = board.length
  const n = board[0].length

  const dfs = (i, j, index) => {
    if (index === word.length) return true
    if (i < 0 || i >= m || j < 0 || j >= n) return false
    if (board[i][j] !== word[index]) return false

    const temp = board[i][j]
    board[i][j] = '#' // 标记已访问
    const found =
      dfs(i + 1, j, index + 1) ||
      dfs(i - 1, j, index + 1) ||
      dfs(i, j + 1, index + 1) ||
      dfs(i, j - 1, index + 1)
    board[i][j] = temp // 回溯恢复
    return found
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true
    }
  }
  return false
}

console.log(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCCED'
  )
) // true
console.log(
  exist(
    [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E'],
    ],
    'ABCB'
  )
) // false
