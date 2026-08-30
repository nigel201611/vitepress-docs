// 22 至少来自几个小区

function main(garden) {
  const cnt = {}
  for (const x of garden) cnt[x] = (cnt[x] || 0) + 1
  let total = 0
  for (const v in cnt) {
    const size = Number(v) + 1
    total += Math.ceil(cnt[v] / size) * size
  }
  return total
}

console.log(main([2, 2, 3]))
