// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 数字到字母的映射（与电话按键相同）：
// 2: abc, 3: def, 4: ghi, 5: jkl, 6: mno, 7: pqrs, 8: tuv, 9: wxyz

// 思路：回溯
// 从头到尾处理每个数字，对每个数字枚举其对应的所有字母，拼接到当前组合中，处理完最后一个数字时收集结果。

var letterCombinations = function (digits) {
  if (digits.length === 0) return []
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const res = []

  const dfs = (index, path) => {
    if (index === digits.length) {
      res.push(path)
      return
    }
    const letters = map[digits[index]]
    for (const ch of letters) {
      dfs(index + 1, path + ch)
    }
  }

  dfs(0, '')
  return res
}

console.log(letterCombinations('23')) // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations('')) // []
