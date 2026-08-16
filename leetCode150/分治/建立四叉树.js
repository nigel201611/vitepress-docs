// 给你一个 n * n 矩阵 grid ，矩阵由若干 0 和 1 组成。请你用四叉树表示该矩阵。
// 四叉树节点 Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight)：
//   - 如果当前网格所有值相同，isLeaf = true，val 为 1 或 0，四个子节点为 null
//   - 否则，把当前网格等分成四份，四个子节点分别递归构建

// 思路：分治
// dfs(r, c, size) 处理以 (r, c) 为左上角、边长为 size 的子矩阵：
// 1. 检查子矩阵是否所有值相同（是则构建叶子节点）
// 2. 否则把 size 减半，递归构建四个子节点
// 检查全同可以顺便在递归中判断，这里用直观的先检查写法。

var construct = function (grid) {
  const n = grid.length

  const isSame = (r, c, size) => {
    const val = grid[r][c]
    for (let i = r; i < r + size; i++) {
      for (let j = c; j < c + size; j++) {
        if (grid[i][j] !== val) return false
      }
    }
    return true
  }

  const dfs = (r, c, size) => {
    if (isSame(r, c, size)) {
      return new Node(grid[r][c] === 1, true, null, null, null, null)
    }
    const half = size >> 1
    return new Node(
      true, // 非叶子节点 val 任意（官方约定为 true）
      false,
      dfs(r, c, half),
      dfs(r, c + half, half),
      dfs(r + half, c, half),
      dfs(r + half, c + half, half)
    )
  }

  return dfs(0, 0, n)
}
