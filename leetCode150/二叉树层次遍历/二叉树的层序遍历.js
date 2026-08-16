// 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。（即逐层地，从左到右访问所有节点）。

// 思路：BFS + 按层分组
// 用队列保存当前层节点。处理每一层时，先记录当前队列长度 size（即这一层的节点数），
// 只取出 size 个节点收集成一层数组，同时把它们的子节点入队，这样就能按层分组。

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
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
