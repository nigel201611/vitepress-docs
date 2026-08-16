// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。

// 思路：BFS 层序遍历，每层取最大值
// 标准层序遍历，每层用 -Infinity 初始化最大值，逐个比较更新。

var largestValues = function (root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const size = queue.length
    let max = -Infinity
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      max = Math.max(max, node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(max)
  }
  return result
}
