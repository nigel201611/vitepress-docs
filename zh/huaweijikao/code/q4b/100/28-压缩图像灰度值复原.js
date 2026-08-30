// 28 压缩图像灰度值复原

function main(compressed, row, col) {
  const width = compressed[1]
  const flat = row * width + col
  let idx = 0
  for (let i = 2; i < compressed.length; i += 2) {
    const val = compressed[i]
    const count = compressed[i + 1]
    if (flat >= idx && flat < idx + count) return val
    idx += count
  }
}

console.log(
  main(
    [10, 10, 56, 34, 99, 1, 87, 8, 99, 3, 255, 6, 99, 5, 255, 4, 99, 7, 255, 2, 99, 9, 255, 21],
    3,
    4
  )
)
