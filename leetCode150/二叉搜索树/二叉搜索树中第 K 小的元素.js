// 给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）。

// 思路：中序遍历（提前终止）
// 二叉搜索树中序遍历结果递增，第 k 小就是中序遍历的第 k 个元素。
// 遍历时计数，数到 k 立即返回，不继续遍历。

var kthSmallest = function (root, k) {
  let count = 0
  let result = null

  const inorder = (node) => {
    if (!node || result !== null) return
    inorder(node.left)
    count++
    if (count === k) {
      result = node.val
      return
    }
    inorder(node.right)
  }

  inorder(root)
  return result
}
