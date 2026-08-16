// 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
var rotate = function (nums, k) {
  let len = nums.length
  let res = new Array(len)
  for (let i = 0; i < len; i++) {
    res[(i + k) % len] = nums[i]
  }

  return res
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3))

// 方法三：数组翻转
const reverse = (nums, start, end) => {
  while (start < end) {
    const temp = nums[start]
    nums[start] = nums[end]
    nums[end] = temp
    start += 1
    end -= 1
  }
}

var rotate = function (nums, k) {
  k %= nums.length
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
}
