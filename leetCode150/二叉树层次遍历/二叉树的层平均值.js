// 给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10⁻⁵ 以内的答案可以被接受。

// 思路：BFS 层序遍历，每层求和取平均
// 标准层序遍历，每层累加节点值后除以该层节点数。

var averageOfLevels = function (root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const size = queue.length
    let sum = 0
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      sum += node.val
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(sum / size)
  }
  return result
}
