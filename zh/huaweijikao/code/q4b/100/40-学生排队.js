// 40 学生排队
// 按身高由低到高排序，身高相同按体重由轻到重排序；
// 身高体重都相同则维持原有的编号顺序（稳定排序）。输出排序后的编号（从1开始）

function main(h, w) {
  const n = h.length
  const stus = []
  for (let i = 0; i < n; i++) {
    stus.push({ h: h[i], w: w[i], id: i + 1 })
  }
  stus.sort((a, b) => {
    if (a.h !== b.h) return a.h - b.h
    if (a.w !== b.w) return a.w - b.w
    return a.id - b.id // 保持原有编号顺序
  })
  return stus.map(s => s.id).join(' ')
}

console.log(main([100, 100, 120, 130], [40, 30, 60, 50]))
