// 54 身高差排序: 按与小明身高差绝对值升序排序, 相同的个子小的排前面
// 输入: H(小明身高), heights(其他小朋友身高数组)

function main(H, heights) {
  const list = heights.slice()
  list.sort((a, b) => {
    const da = Math.abs(a - H)
    const db = Math.abs(b - H)
    if (da !== db) return da - db
    return a - b
  })
  return list.join(' ')
}

console.log(main(100, [95, 96, 97, 98, 99, 101, 102, 103, 104, 105]))
