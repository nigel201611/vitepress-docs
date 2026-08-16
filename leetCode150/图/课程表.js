// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
// 在选修某些课程之前需要一些先修课程。先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [a, b] ，
// 表示想要学习课程 a 之前必须先学习课程 b 。
// 请你判断是否可能完成所有课程的学习。如果可以，返回 true ；否则，返回 false 。

// 思路：拓扑排序（Kahn 算法 / BFS）
// 1. 建图：邻接表，统计每个节点的入度
// 2. 把所有入度为 0 的节点入队（不需要先修课，可以直接学）
// 3. 依次出队，把它的后继节点入度减 1，减到 0 时入队
// 4. 如果出队节点总数 == 课程总数，说明没有环，可以学完；否则存在循环依赖，返回 false

var canFinish = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0)
  const graph = Array.from({ length: numCourses }, () => [])

  for (const [a, b] of prerequisites) {
    graph[b].push(a) // b 是 a 的先修课，学完 b 后 a 才解锁
    inDegree[a]++
  }

  const queue = []
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i)
  }

  let count = 0
  while (queue.length) {
    const cur = queue.shift()
    count++
    for (const next of graph[cur]) {
      inDegree[next]--
      if (inDegree[next] === 0) queue.push(next)
    }
  }
  return count === numCourses
}

console.log(canFinish(2, [[1, 0]])) // true
console.log(canFinish(2, [[1, 0], [0, 1]])) // false（循环依赖）
