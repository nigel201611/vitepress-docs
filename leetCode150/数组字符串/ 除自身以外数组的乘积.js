// 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

// 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

// 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
var productExceptSelf = function (nums) {
  const length = nums.length

  // L 和 R 分别表示左右两侧的乘积列表
  const L = new Array(length)
  const R = new Array(length)

  const answer = new Array(length)

  // L[i] 为索引 i 左侧所有元素的乘积
  // 对于索引为 '0' 的元素，因为左侧没有元素，所以 L[0] = 1
  L[0] = 1
  for (let i = 1; i < length; i++) {
    L[i] = nums[i - 1] * L[i - 1]
  }

  // R[i] 为索引 i 右侧所有元素的乘积
  // 对于索引为 'length-1' 的元素，因为右侧没有元素，所以 R[length-1] = 1
  R[length - 1] = 1
  for (let i = length - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1]
  }

  // 对于索引 i，除 nums[i] 之外其余各元素的乘积就是左侧所有元素的乘积乘以右侧所有元素的乘积
  for (let i = 0; i < length; i++) {
    answer[i] = L[i] * R[i]
  }

  return answer
}

// 方法二：空间复杂度 O(1) 的方法
// 尽管上面的方法已经能够很好的解决这个问题，但是空间复杂度并不为常数。

// 由于输出数组不算在空间复杂度内，那么我们可以将 L 或 R 数组用输出数组来计算。先把输出数组当作 L 数组来计算，然后再动态构造 R 数组得到结果。让我们来看看基于这个思想的算法。

// 初始化 answer 数组，对于给定索引 i,answer[i] 代表的是 i 左侧所有数字的乘积。
// 构造方式与之前相同，只是我们试图节省空间，先把 answer 作为方法一的 L 数组。
// 这种方法的唯一变化就是我们没有构造 R 数组。而是用一个遍历来跟踪右边元素的乘积。
// 并更新数组 answer[i]=answer[i]*R。然后 R 更新为 R=R*nums[i]，其中变量 R 表示的就是索引右侧数字的乘积。

var productExceptSelf = function (nums) {
  const length = nums.length
  const answer = new Array(length)

  // answer[i] 表示索引 i 左侧所有元素的乘积
  // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
  answer[0] = 1
  for (let i = 1; i < length; i++) {
    answer[i] = nums[i - 1] * answer[i - 1]
  }

  // R 为右侧所有元素的乘积
  // 刚开始右边没有元素，所以 R = 1
  let R = 1
  for (let i = length - 1; i >= 0; i--) {
    // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
    answer[i] = answer[i] * R
    // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
    R *= nums[i]
  }
  return answer
}
