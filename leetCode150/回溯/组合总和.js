// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，
// 找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

// 思路：回溯（组合总和：可重复选取）
// 先排序，每次从 start 开始选择（允许选同一个下标，所以递归时传 i 而不是 i+1）。
// 剪枝：排序后若当前数字已经大于剩余目标，后面更大，直接 break。

var combinationSum = function (candidates, target) {
  candidates.sort((a, b) => a - b)
  const res = []
  const path = []

  const dfs = (start, rest) => {
    if (rest === 0) {
      res.push([...path])
      return
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > rest) break // 剪枝：排序后无需再往后看
      path.push(candidates[i])
      dfs(i, rest - candidates[i]) // 同一个数字可以重复选，所以还是传 i
      path.pop()
    }
  }

  dfs(0, target)
  return res
}

console.log(combinationSum([2, 3, 6, 7], 7)) // [[2,2,3],[7]]
console.log(combinationSum([2, 3, 5], 8)) // [[2,2,2,2],[2,3,3],[3,5]]
