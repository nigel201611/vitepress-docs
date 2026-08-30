// 58. 二叉树求和
// 输入：2 行整数，第 1 行为二叉树的中序遍历，第 2 行为二叉树的前序遍历（空格分隔）
// 生成一棵新二叉树：每个节点的新值 = 原始树中它的左子树所有节点之和 + 右子树所有节点之和
// 输出：新树的中序遍历结果（空格分隔）
function main(inorder, preorder) {
  let pi = 0
  const n = inorder.length

  function build(lo, hi) {
    if (lo > hi) return null
    const val = preorder[pi++]
    let pos = inorder.indexOf(val, lo)
    if (pos > hi) pos = inorder.lastIndexOf(val, hi)
    const node = { val }
    node.left = build(lo, pos - 1)
    node.right = build(pos + 1, hi)
    node.newVal = (node.left ? sum(node.left) : 0) + (node.right ? sum(node.right) : 0)
    return node
  }
  function sum(node) {
    if (!node) return 0
    return node.val + sum(node.left) + sum(node.right)
  }

  const root = build(0, n - 1)
  const res = []
  function inorderWalk(node) {
    if (!node) return
    inorderWalk(node.left)
    res.push(node.newVal)
    inorderWalk(node.right)
  }
  inorderWalk(root)
  return res.join(' ')
}

console.log(main([-3, 12, 6, 8, 9, -10, -7], [8, 12, -3, 6, -10, 9, -7]))
