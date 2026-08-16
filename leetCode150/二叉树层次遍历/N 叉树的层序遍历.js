// 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
// N 叉树的每个节点都可能有多个子节点，用 children 数组保存。

// 思路：BFS，与二叉树层序遍历相同，只是把 left/right 换成遍历 children。

var levelOrder = function (root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const size = queue.length
    const level = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      level.push(node.val)
      for (const child of node.children) {
        queue.push(child)
      }
    }
    result.push(level)
  }
  return result
}
