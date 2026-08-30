// 20 内存页冷热标记

function main(n, nums, t) {
  const cnt = {}
  for (const x of nums) cnt[x] = (cnt[x] || 0) + 1
  const items = Object.entries(cnt).filter(([, c]) => c >= t)
  items.sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))
  return [items.length, ...items.map(([p]) => p)].join('\n')
}

console.log(main(10, [1, 2, 1, 2, 1, 2, 1, 2, 1, 2], 5))
