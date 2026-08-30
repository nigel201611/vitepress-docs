// 【最长广播响应】(图-迪杰斯特拉算法)

function main(count, nums, from) {
  let N = count // 网络节点数
  let T = nums.length // 时延列表长度
  // 使用hashMap存储节点的连接关系
  let map = new Map()

  for (let i = 0; i < T; i++) {
    let start = nums[i][0]
    let end = nums[i][1]
    if (!map.has(start)) {
      map.set(start, [])
    }
    if (!map.has(end)) {
      map.set(end, [])
    }
    map.get(start).push(end)
    map.get(end).push(start)
  }

  let head = from
  let queue = []
  queue.push(head)
  let visited = new Set() // 判断是否已经访问过
  let d = new Array(N + 1) // 最短路径长度数组
  d = d.fill(0)
  visited.add(head)
  while (queue.length) {
    let poll = queue.shift()
    let list = map.get(poll)
    for (let i = 0; i < list.length; i++) {
      let node = list[i]
      if (!visited.has(node)) {
        visited.add(node)
        d[node] = d[poll] + 1
        queue.push(node)
      }
    }
  }

  console.log(d)
  let res = 0 // 最大最短路径
  for (let i = 1; i < N + 1; i++) {
    res = Math.max(res, d[i])
  }
  return res * 2
}

console.log(
  main(
    5,
    [
      [2, 1],
      [1, 4],
      [2, 4],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 5]
    ],
    2
  )
)
