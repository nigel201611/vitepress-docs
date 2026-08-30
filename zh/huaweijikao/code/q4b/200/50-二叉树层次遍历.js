// 50. 二叉树层次遍历
// 输入：后序遍历字符串 中序遍历字符串
// 输出：层次遍历结果
function main(postorder, inorder) {
  let pi = postorder.length - 1
  function build(lo, hi) {
    if (lo > hi) return null
    const val = postorder[pi--]
    let pos = inorder.indexOf(val, lo)
    if (pos > hi) pos = inorder.lastIndexOf(val, hi)
    const node = { val, left: null, right: null }
    node.right = build(pos + 1, hi)
    node.left = build(lo, pos - 1)
    return node
  }
  const root = build(0, inorder.length - 1)
  const res = []
  const queue = [root]
  while (queue.length) {
    const cur = queue.shift()
    if (!cur) continue
    res.push(cur.val)
    queue.push(cur.left)
    queue.push(cur.right)
  }
  return res.join('')
}

console.log(main('CBEFDA', 'CBAEDF'))
