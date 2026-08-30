// 34 交换服务器CPU算力
// 交换一次后两组总算力相等：sumA - a + b === sumB - b + a
// 即 a - b === (sumA - sumB) / 2
// 要求从A组选出的CPU算力尽可能小

function main(a, b) {
  const sumA = a.reduce((s, x) => s + x, 0)
  const sumB = b.reduce((s, x) => s + x, 0)
  const diff = (sumA - sumB) >> 1 // a - b = diff
  const setB = new Set(b)
  // A组算力从小到大遍历，找到第一个满足条件的即可保证A选的算力最小
  const sortedA = [...a].sort((x, y) => x - y)
  for (const x of sortedA) {
    if (setB.has(x - diff)) {
      return x + ' ' + (x - diff)
    }
  }
  return 'NA'
}

console.log(main([1, 1], [2, 2]))
