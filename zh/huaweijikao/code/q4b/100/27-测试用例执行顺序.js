// 27 测试用例执行顺序

function main(n, m, priorities, testCases) {
  const items = testCases.map((feats, idx) => ({
    id: idx + 1,
    pri: feats.reduce((s, f) => s + priorities[f - 1], 0),
  }))
  items.sort((a, b) => b.pri - a.pri || a.id - b.id)
  return items.map((it) => it.id).join('\n')
}

console.log(main(5, 4, [1, 1, 2, 3, 5], [[1, 2, 3], [1, 4], [3, 4, 5], [2, 3, 4]]))
