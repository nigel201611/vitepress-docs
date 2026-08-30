// 29 三叉搜索树高度

function main(n, nums) {
  const newNode = (val) => ({ val, left: null, mid: null, right: null })
  const root = newNode(nums[0])
  for (let i = 1; i < n; i++) {
    const v = nums[i]
    let node = root
    while (true) {
      if (v < node.val - 500) {
        if (!node.left) {
          node.left = newNode(v)
          break
        }
        node = node.left
      } else if (v > node.val + 500) {
        if (!node.right) {
          node.right = newNode(v)
          break
        }
        node = node.right
      } else {
        if (!node.mid) {
          node.mid = newNode(v)
          break
        }
        node = node.mid
      }
    }
  }

  function height(node) {
    if (!node) return 0
    return 1 + Math.max(height(node.left), height(node.mid), height(node.right))
  }

  return height(root)
}

console.log(main(5, [5000, 2000, 5000, 8000, 1800]))
