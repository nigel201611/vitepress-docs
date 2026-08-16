// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' 组成，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
// 注意：与边界相连的 'O' 不会被包围（边界上的 'O' 或能沿 'O' 走到边界外的连通块），不需要填充。

// 思路：从边界反向标记 + 翻转
// 1. 从四条边上的每个 'O' 出发 DFS，把所有「与边界相连」的 'O' 标记为 '#'（哨兵字符）
// 2. 遍历整个矩阵：
//    - '#' 恢复为 'O'（没被包围，保留）
//    - 剩下的 'O' 全部翻转为 'X'（被包围了）

var solve = function (board) {
  const m = board.length
  const n = board[0].length

  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') return
    board[i][j] = '#' // 标记为与边界相连
    dfs(i + 1, j)
    dfs(i - 1, j)
    dfs(i, j + 1)
    dfs(i, j - 1)
  }

  // 从四条边上的 'O' 出发标记
  for (let i = 0; i < m; i++) {
    dfs(i, 0)
    dfs(i, n - 1)
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j)
    dfs(m - 1, j)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === '#') {
        board[i][j] = 'O'
      } else if (board[i][j] === 'O') {
        board[i][j] = 'X'
      }
    }
  }
}

const board = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
]
solve(board)
console.log(board)
// [
//   ['X','X','X','X'],
//   ['X','X','X','X'],
//   ['X','X','X','X'],
//   ['X','O','X','X']
// ]
