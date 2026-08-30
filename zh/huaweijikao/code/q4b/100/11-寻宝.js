// 11 寻宝：m行n列,横纵坐标数位之和<=k的格子有黄金,从(0,0)四方向移动,求最多获得多少克黄金

function main(m, n, k) {
  const digitSum = (x) => {
    let s = 0
    while (x > 0) {
      s += x % 10
      x = Math.floor(x / 10)
    }
    return s
  }
  const seen = new Set()
  const queue = [[0, 0]]
  seen.add('0,0')
  let count = 0
  while (queue.length) {
    const [x, y] = queue.pop()
    count++
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue
      if (seen.has(nx + ',' + ny)) continue
      if (digitSum(nx) + digitSum(ny) > k) continue
      seen.add(nx + ',' + ny)
      queue.push([nx, ny])
    }
  }
  return count
}

console.log(main(40, 40, 18))
