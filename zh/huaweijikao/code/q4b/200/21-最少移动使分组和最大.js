// 第 21 题:最少移动次数使得数组和S最大
// 1..n 的排列(n 为 3 的倍数),顺序每 3 个一组,去掉组内最大值与最小值后将剩下的
// (中位数)累加为 S。可以"取出一个元素插入任意位置"(每个元素至多移动一次),
// 求使 S 最大所需的最少移动次数。
//
// 一、理论最大 S:设 k = n/3,每组的中位数最大可取 n-1, n-3, ...(共 k 个),
//     即最大 S = (n-1) + (n-3) + ... = k*(n) - k*k = n*k - k*k = (2/9)*n*n。
//     要达到该值,每组须恰为 {L, M, U}:M 集合 {n-1, n-3, ...},U 集合 {n, n-2, ...},
//     L 集合 {1..k}。
// 二、最少移动次数:BFS 逐层搜索状态空间(状态 = 数组的一个排列),
//     一步移动 = 取出一个元素插入任意位置,首次到达"S = 理论最大值"状态的层数即答案。
function main(arr) {
  const n = arr.length
  const k = n / 3
  const goal = 2 * k * k // 理论最大 S
  const calcS = (a) => {
    let s = 0
    for (let i = 0; i < n; i += 3) {
      const t = [a[i], a[i + 1], a[i + 2]].sort((x, y) => x - y)
      s += t[1]
    }
    return s
  }
  if (calcS(arr) === goal) return 0
  let level = [[...arr]]
  const seen = new Set([arr.join(',')])
  for (let depth = 1; depth <= n; depth++) {
    const next = []
    for (const cur of level) {
      for (let i = 0; i < n; i++) {
        const rest = [...cur.slice(0, i), ...cur.slice(i + 1)]
        for (let j = 0; j < n; j++) {
          if (j === i) continue
          const cand = [...rest.slice(0, j), cur[i], ...rest.slice(j)]
          const key = cand.join(',')
          if (seen.has(key)) continue
          seen.add(key)
          if (calcS(cand) === goal) return depth
          next.push(cand)
        }
      }
    }
    level = next
  }
  return n
}

console.log(main([1, 8, 9, 7, 4, 2, 5, 6, 3].map(Number)))
