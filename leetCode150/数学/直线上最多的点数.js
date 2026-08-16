// 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。

// 思路：枚举每个点作为直线起点 + 斜率计数
// 固定一个点 i，统计它与其他所有点的斜率（用最简分数的字符串作 key，避免浮点精度问题）：
//   斜率 = dy / dx，用 gcd 归一化成最简比，如 2/4 -> 1/2
// 相同斜率说明共线。重复点单独计数（same）。
// 对每个起点维护 Map<斜率, 个数>，取最大值。总复杂度 O(n²)。

var maxPoints = function (points) {
  const n = points.length
  if (n <= 2) return n

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
  let max = 0

  for (let i = 0; i < n; i++) {
    const count = new Map()
    let same = 1 // 与点 i 重合的点的个数（含自身）
    for (let j = i + 1; j < n; j++) {
      let dx = points[j][0] - points[i][0]
      let dy = points[j][1] - points[i][1]
      if (dx === 0 && dy === 0) {
        same++
        continue
      }
      const g = gcd(Math.abs(dx), Math.abs(dy))
      dx /= g
      dy /= g
      if (dx < 0) {
        dx = -dx // 统一符号，避免 1/-2 和 -1/2 被当成两种斜率
        dy = -dy
      }
      const key = dx + '/' + dy
      count.set(key, (count.get(key) || 0) + 1)
    }
    max = Math.max(max, same)
    for (const v of count.values()) {
      max = Math.max(max, v + same)
    }
  }
  return max
}

console.log(maxPoints([[1, 1], [2, 2], [3, 3]])) // 3
console.log(maxPoints([[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]])) // 4
