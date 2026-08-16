// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

// 思路：回溯（排列问题：每个位置可以选任意未使用的数字）
// 用 used 数组标记某个下标是否已使用，每层递归在未使用的数字中选一个填入当前位置。
// 与组合的区别：组合用 start 限制选择范围，排列需要 used 标记 + 每次从头遍历。

var permute = function (nums) {
  const res = []
  const path = []
  const used = new Array(nums.length).fill(false)

  const dfs = () => {
    if (path.length === nums.length) {
      res.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      used[i] = true
      path.push(nums[i])
      dfs()
      path.pop()
      used[i] = false
    }
  }

  dfs()
  return res
}

console.log(permute([1, 2, 3])) // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([0, 1])) // [[0,1],[1,0]]
