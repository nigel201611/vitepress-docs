// 6 核酸检测：从确诊病例出发,沿接触关系传播,统计需要做核酸检测的人数

function main(n, confirmed, matrix) {
  const need = new Set()
  const seen = new Set(confirmed)
  const queue = [...confirmed]
  while (queue.length) {
    const cur = queue.pop()
    for (let j = 0; j < n; j++) {
      if (matrix[cur][j] === 1 && !seen.has(j)) {
        seen.add(j)
        need.add(j)
        queue.push(j)
      }
    }
  }
  return need.size
}

console.log(main(5, [0], [[0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 0]]))
