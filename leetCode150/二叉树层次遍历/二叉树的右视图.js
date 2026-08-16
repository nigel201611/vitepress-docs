// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

// 思路：BFS 层序遍历，取每层最后一个节点
// 标准层序遍历，每层收集完后把该层的最后一个节点值加入结果。

var rightSideView = function (root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      if (i === size - 1) result.push(node.val) // 本层最后一个节点（最右侧）
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return result
}
