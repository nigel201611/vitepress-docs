//滑动窗口最大和
function main(nums, windomSize) {
  let left = 0
  let maxSum = 0
  while (left <= nums.length - windomSize) {
    let temp = 0
    for (let i = left; i <= left + windomSize - 1; i++) {
      temp += nums[i]
    }
    left++
    if (temp > maxSum) {
      maxSum = temp
    }
  }
  return maxSum
}

console.log(main([10, 20, 30, 15, 23, 12], 3))
