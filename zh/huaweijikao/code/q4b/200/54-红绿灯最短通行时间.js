// 54. 红绿灯最短通行时间
// 输入：lights（n*m 街口交通灯周期），timePerRoad（相邻街口通过时间），起点 (rowStart,colStart)，终点 (rowEnd,colEnd)
// 规则：直行和左转需要等待所在街口交通灯周期 T 的时间，右转无需等待；起点和终点交通灯不计入时间
function main(lights, timePerRoad, rowStart, colStart, rowEnd, colEnd) {
  const n = lights.length
  const m = lights[0].length
  if (rowStart === rowEnd && colStart === colEnd) return 0
  const INF = Infinity
  // 方向：0=北 1=东 2=南 3=西
  const dr = [-1, 0, 1, 0]
  const dc = [0, 1, 0, -1]
  const dist = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => [INF, INF, INF, INF])
  )
  const pq = []
  for (let d = 0; d < 4; d++) {
    dist[rowStart][colStart][d] = 0
    pq.push([0, rowStart, colStart, d])
  }
  while (pq.length) {
    let bi = 0
    for (let i = 1; i < pq.length; i++) {
      if (pq[i][0] < pq[bi][0]) bi = i
    }
    const [cost, r, c, dir] = pq.splice(bi, 1)[0]
    if (cost > dist[r][c][dir]) continue
    if (r === rowEnd && c === colEnd) return cost
    for (let nd = 0; nd < 4; nd++) {
      if (nd === (dir + 2) % 4) continue // 不允许掉头
      const nr = r + dr[nd]
      const nc = c + dc[nd]
      if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue
      // 转弯/直行发生在当前街口 (r,c)：0=直行 1=右转 2=掉头 3=左转
      const turn = (nd - dir + 4) % 4
      let wait = 0
      const isStart = r === rowStart && c === colStart
      const isEnd = r === rowEnd && c === colEnd
      if (!isStart && !isEnd && turn !== 1) {
        wait = lights[r][c]
      }
      const ncost = cost + timePerRoad + wait
      if (ncost < dist[nr][nc][nd]) {
        dist[nr][nc][nd] = ncost
        pq.push([ncost, nr, nc, nd])
      }
    }
  }
  return -1
}

console.log(main([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 60, 0, 0, 2, 2))
