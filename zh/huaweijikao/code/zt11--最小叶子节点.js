// 最小叶子节点
// 二叉树也可以用数组来存储，
// 给定一个数组，树的根节点的值储存在下标1，
// 对于储存在下标n的节点，他的左子节点和右子节点分别储存在下标2*n和2*n+1，
// 并且我们用-1代表一个节点为空，
// 给定一个数组存储的二叉树，
// 试求从根节点到最小的叶子节点的路径，
// 路径由节点的值组成。

function main(arr) {
  let arrCp = [-1, ...arr]
  let len = arr.length
  let minValue = Number.MAX_SAFE_INTEGER
  let minIdx = -1
  for (let i = 2; i <= len; i++) {
    let value = parseInt(arrCp[i])
    if (minValue > value && value !== -1) {
      minValue = value
      minIdx = i
    }
  }
  let path = []
  while (minIdx >= 1) {
    path.unshift(arrCp[minIdx])
    minIdx = Math.floor(minIdx / 2)
  }

  return path.join(' ')
}

console.log(main([5, 9, 8, -1, -1, 7, -1, -1, -1, -1, -1, 6])) // 5 8 7 6

console.log(main([3, 5, 7, -1, -1, 2, 4])) // 3 7 2
