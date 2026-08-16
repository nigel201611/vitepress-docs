// n 皇后问题 研究的是如何将 n 个皇后放置在 n × n 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。
// （皇后可以攻击同一行、同一列、同一对角线的其他棋子）

// 思路：回溯（逐行放置 + 剪枝）
// 每行只能放一个皇后，所以按行递归，枚举该行每个列位置。
// 用三个集合记录冲突信息：
//   列冲突：cols
//   主对角线（左上→右下）冲突：diag1，同一条对角线的行-列之差为常数
//   副对角线（右上→左下）冲突：diag2，同一条对角线的行+列之和为常数
// 三个都不冲突才放皇后，进入下一行。

var totalNQueens = function (n) {
  const cols = new Set()
  const diag1 = new Set() // 行 - 列
  const diag2 = new Set() // 行 + 列
  let count = 0

  const dfs = (row) => {
    if (row === n) {
      count++
      return
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue
      cols.add(col)
      diag1.add(row - col)
      diag2.add(row + col)
      dfs(row + 1)
      cols.delete(col)
      diag1.delete(row - col)
      diag2.delete(row + col)
    }
  }

  dfs(0)
  return count
}

console.log(totalNQueens(4)) // 2
console.log(totalNQueens(1)) // 1
