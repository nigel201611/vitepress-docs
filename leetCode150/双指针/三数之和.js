// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

// 你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	let n = nums.length
	nums.sort((a, b) => a - b)
	let ans = []
	// 枚举 a
	for (let first = 0; first < n; ++first) {
		// 需要和上一次枚举的数不相同
		if (first > 0 && nums[first] == nums[first - 1]) {
			continue
		}
		// c 对应的指针初始指向数组的最右端
		let third = n - 1
		let target = -nums[first]
		// 枚举 b
		for (let second = first + 1; second < n; ++second) {
			// 需要和上一次枚举的数不相同
			if (second > first + 1 && nums[second] == nums[second - 1]) {
				continue
			}
			// 需要保证 b 的指针在 c 的指针的左侧
			while (second < third && nums[second] + nums[third] > target) {
				--third
			}
			// 如果指针重合，随着 b 后续的增加
			// 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
			if (second == third) {
				break
			}
			if (nums[second] + nums[third] == target) {
				let list = []
				list.push(nums[first])
				list.push(nums[second])
				list.push(nums[third])
				ans.push(list)
			}
		}
	}

	return ans
}
