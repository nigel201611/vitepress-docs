// 48 银饰熔化
// 每回合取出最重的三块 x<=y<=z 一起熔掉：
// x==y==z 全熔；x==y 剩 z-x；y==z 剩 y-x；x!=y 且 y!=z 剩 |(z-y)-(y-x)|
// 剩余银块放入下一轮；最后剩2块返回较重者，剩1块返回其重量，剩0块返回0

function main(n, weights) {
  const w = [...weights]
  while (w.length >= 3) {
    w.sort((a, b) => a - b)
    const x = w.shift()
    const y = w.shift()
    const z = w.shift()
    let r = 0
    if (x === y && y === z) {
      r = 0
    } else if (x === y) {
      r = z - y
    } else if (y === z) {
      r = y - x
    } else {
      r = Math.abs((z - y) - (y - x))
    }
    if (r > 0) {
      w.push(r)
    }
  }
  if (w.length === 0) return 0
  if (w.length === 1) return w[0]
  return Math.max(w[0], w[1])
}

console.log(main(3, [1, 1, 1]))
