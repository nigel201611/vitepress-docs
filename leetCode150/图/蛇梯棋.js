// 给你一个 n x n 的整数矩阵 board ，方格编号从 1 到 n²（按蛇形编号：从最后一行的第一个格开始，从左到右、从右到左交替）。
// 棋子从 1 号格开始，每轮掷一次骰子（1~6），向前移动 x 步到 x + dice 号格。
// 如果该格有梯子或蛇（board[i][j] !== -1），则必须直接跳到目标格。
// 返回棋子到达 n² 号格的最少移动次数，无法到达返回 -1。

// 思路：BFS 求最短步数
// 1. 把棋盘按蛇形展开成一维数组，便于按编号索引
// 2. BFS：每次枚举骰子 1~6 的下一步，如果该格有梯子/蛇则直接跳转
// 3. 用 dist 数组记录到每个格子的最少轮数，首次到达 n² 即是最优解

var snakesAndLadders = function (board) {
  const n = board.length
  const cells = [] // cells[i] 表示第 i+1 号格的内容（-1 为普通格，否则是跳转目标）
  let leftToRight = true
  for (let i = n - 1; i >= 0; i--) {
    const row = leftToRight ? board[i] : [...board[i]].reverse()
    cells.push(...row)
    leftToRight = !leftToRight
  }

  const dist = new Array(n * n).fill(-1)
  dist[0] = 0
  const queue = [0]

  while (queue.length) {
    const cur = queue.shift()
    if (cur === n * n - 1) return dist[cur]
    for (let step = 1; step <= 6; step++) {
      let next = cur + step
      if (next >= n * n) break
      if (cells[next] !== -1) next = cells[next] - 1 // 遇到梯子/蛇必须直接跳转
      if (dist[next] === -1) {
        dist[next] = dist[cur] + 1
        queue.push(next)
      }
    }
  }
  return -1
}

console.log(
  snakesAndLadders([
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, 35, -1, -1, 13, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, 15, -1, -1, -1, -1],
  ])
) // 4
