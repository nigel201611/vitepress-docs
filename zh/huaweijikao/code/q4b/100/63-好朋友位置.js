// 63 好朋友位置: 输出每个小朋友向右看到的第一个比自己身高更高的小朋友的位置, 没有则输出0
// 输入: heights(身高数组); 输出位置从1开始计

function main(heights) {
  const n = heights.length
  const res = new Array(n).fill(0)
  // 单调递减栈, 找右边第一个更大的元素
  const stack = []
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] <= heights[i]) {
      stack.pop()
    }
    if (stack.length > 0) {
      res[i] = stack[stack.length - 1] + 1
    }
    stack.push(i)
  }
  return res.join(' ')
}

console.log(main([100, 95]))

// 有好友的示例
console.log(main([1, 3, 2]))
