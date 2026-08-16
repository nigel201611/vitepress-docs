// 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1 。
// 给你一个数组 prerequisites ，其中 prerequisites[i] = [a, b] ，表示在选修课程 a 前 必须 先选修课程 b 。
// 请你返回你为了学完所有课程所安排的学习顺序。如果有多个正确的顺序，只要返回 任意一种 即可。如果不可能完成所有课程学习，返回一个空数组。

// 思路：拓扑排序（Kahn 算法），与「课程表」几乎相同，只是把出队顺序记录下来返回。

var findOrder = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0)
  const graph = Array.from({ length: numCourses }, () => [])

  for (const [a, b] of prerequisites) {
    graph[b].push(a)
    inDegree[a]++
  }

  const queue = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }

  const order = []
  while (queue.length) {
    const cur = queue.shift()
    order.push(cur)
    for (const next of graph[cur]) {
      inDegree[next]--
      if (inDegree[next] === 0) queue.push(next)
    }
  }
  return order.length === numCourses ? order : []
}

console.log(findOrder(2, [[1, 0]])) // [0, 1]
console.log(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])) // [0, 1, 2, 3] 或 [0, 2, 1, 3]
console.log(findOrder(1, [])) // [0]
