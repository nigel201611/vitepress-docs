// 31 最富裕的小家庭

function main(n, wealth, edges) {
  const children = Array.from({ length: n + 1 }, () => [])
  for (const [p, c] of edges) children[p].push(c)
  let best = 0
  for (let i = 1; i <= n; i++) {
    let sum = wealth[i - 1]
    for (const c of children[i]) sum += wealth[c - 1]
    best = Math.max(best, sum)
  }
  return best
}

console.log(
  main(4, [100, 200, 300, 500], [
    [1, 2],
    [1, 3],
    [2, 4],
  ])
)
