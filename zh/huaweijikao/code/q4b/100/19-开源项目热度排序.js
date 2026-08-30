// 19 开源项目热度排序

function main(n, weights, projects) {
  const [wWatch, wStar, wFork, wIssue, wMr] = weights
  const items = projects.map(([name, ...nums]) => {
    const h =
      wWatch * nums[0] + wStar * nums[1] + wFork * nums[2] + wIssue * nums[3] + wMr * nums[4]
    return { name, h }
  })
  items.sort((a, b) => {
    if (b.h !== a.h) return b.h - a.h
    const al = a.name.toLowerCase()
    const bl = b.name.toLowerCase()
    return al < bl ? -1 : al > bl ? 1 : 0
  })
  return items.map((it) => it.name).join('\n')
}

console.log(
  main(
    4,
    [8, 6, 2, 8, 6],
    [
      ['camila', 66, 70, 46, 158, 80],
      ['victoria', 94, 76, 86, 189, 211],
      ['anthony', 29, 17, 83, 21, 48],
      ['emily', 53, 97, 1, 19, 218],
    ]
  )
)
