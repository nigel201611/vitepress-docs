// 56 内存分配: 100字节堆, 优先选择紧接着前一块已使用内存、空间足够且最接近申请大小的空闲内存
// 输入: request(期望申请字节数), blocks(已分配的内存块 [偏移, 大小])
// 申请成功输出偏移, 失败输出 -1

function main(request, blocks) {
  const TOTAL = 100
  if (!Number.isInteger(request) || request <= 0) return -1
  for (const b of blocks) {
    const a = b[0]
    const size = b[1]
    if (!Number.isInteger(a) || !Number.isInteger(size) || a < 0 || size <= 0 || a + size > TOTAL) {
      return -1
    }
  }
  const sorted = blocks.slice().sort((x, y) => x[0] - y[0])
  for (let i = 0; i + 1 < sorted.length; i++) {
    if (sorted[i][0] + sorted[i][1] > sorted[i + 1][0]) return -1
  }
  let best = -1
  let bestLen = Infinity
  for (let i = 0; i < sorted.length; i++) {
    const start = sorted[i][0] + sorted[i][1]
    const end = i + 1 < sorted.length ? sorted[i + 1][0] : TOTAL
    const len = end - start
    if (len >= request && len < bestLen) {
      bestLen = len
      best = start
    }
  }
  if (best >= 0) return best
  // 堆中无任何已使用内存时, 整块内存空闲
  if (sorted.length === 0 && request <= TOTAL) return 0
  return -1
}

console.log(main(1, [[0, 1], [3, 2]]))

// 非法输入示例: 区域重叠
console.log(main(1, [[0, 2], [1, 1]]))
// 空间不足
console.log(main(10, [[0, 95]]))
