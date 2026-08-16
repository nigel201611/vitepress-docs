// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。你可以按 任何顺序 返回答案。

// 思路：回溯（组合问题：升序枚举避免重复）
// 每次从 start 开始选择数字，保证选出的数字严格递增，就不会产生重复组合（如 [1,2] 和 [2,1]）。
// 剪枝：剩余可选数字不足 k - path.length 时提前返回。

var combine = function (n, k) {
  const res = []
  const path = []

  const dfs = (start) => {
    if (path.length === k) {
      res.push([...path])
      return
    }
    // 剪枝：即使把后面所有数字都选上也不够 k 个，直接放弃
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
      path.push(i)
      dfs(i + 1)
      path.pop()
    }
  }

  dfs(1)
  return res
}

console.log(combine(4, 2)) // [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(combine(1, 1)) // [[1]]
