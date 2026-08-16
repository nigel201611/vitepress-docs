// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
// 有效二叉搜索树定义如下：节点的左子树只包含小于当前节点的数；节点的右子树只包含大于当前节点的数；所有左子树和右子树自身必须也是二叉搜索树。

// 思路一：中序遍历
// 二叉搜索树的中序遍历结果严格递增。中序遍历过程中记录前一个节点的值，出现 <= 前值即非法。
// 注意：不能只比较 node.val 与父节点，需要整棵树范围约束，中序遍历天然满足。

var isValidBST = function (root) {
  let prev = -Infinity
  const inorder = (node) => {
    if (!node) return true
    if (!inorder(node.left)) return false
    if (node.val <= prev) return false // 中序必须严格递增
    prev = node.val
    return inorder(node.right)
  }
  return inorder(root)
}
