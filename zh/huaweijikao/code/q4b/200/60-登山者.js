// 60. 登山者
// 输入：地图数组 map（每一格为海拔高度，0 为地面），登山者体力（上限 999）
// 上山每相邻高度差消耗 2 倍体力，下坡消耗 1 倍体力，平地不消耗；体力消耗到零有生命危险
// 起点和终点可以是地图中任何高度为 0 的地面
// 输出：可以安全往返（往返消耗体力必须严格小于体力值）的山峰数量
function main(map, stamina) {
  const n = map.length
  // 山峰：高度大于两边，或者在地图边界
  const peaks = []
  for (let i = 0; i < n; i++) {
    const leftOK = i === 0 || map[i] > map[i - 1]
    const rightOK = i === n - 1 || map[i] > map[i + 1]
    if (leftOK && rightOK) peaks.push(i)
  }
  if (peaks.length === 0) return 0
  const grounds = []
  for (let i = 0; i < n; i++) {
    if (map[i] === 0) grounds.push(i)
  }
  if (grounds.length === 0) return 0

  // 从 a 走到 b（相邻格递进）的体力消耗
  function pathCost(a, b) {
    let cost = 0
    if (a < b) {
      for (let i = a; i < b; i++) {
        const diff = map[i + 1] - map[i]
        cost += diff > 0 ? 2 * diff : -diff
      }
    } else {
      for (let i = a; i > b; i--) {
        const diff = map[i] - map[i - 1]
        cost += diff > 0 ? diff : -2 * diff
      }
    }
    return cost
  }

  let count = 0
  for (const p of peaks) {
    let minTo = Infinity
    let minBack = Infinity
    for (const g of grounds) {
      const to = pathCost(g, p)
      const back = pathCost(p, g)
      if (to < minTo) minTo = to
      if (back < minBack) minBack = back
    }
    if (minTo + minBack < stamina) count++
  }
  return count
}

console.log(main([0, 1, 4, 3, 1, 0, 0, 1, 2, 3, 1, 2, 1, 0], 13))
console.log(main([1, 4, 3], 999))
