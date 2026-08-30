// 字符串拼接:从字符列表中选取N个拼接,相同字符不能相邻,统计满足条件的字符串种类数
function main(chars, len) {
  const N = len
  if (typeof chars !== 'string' || !/^[a-z]+$/.test(chars) || N < 1 || N > 5 || N > chars.length) {
    return 0
  }
  const cnt = new Array(26).fill(0)
  for (const c of chars) cnt[c.charCodeAt(0) - 97]++
  let ans = 0
  const dfs = (used, prev) => {
    if (used === N) {
      ans++
      return
    }
    for (let i = 0; i < 26; i++) {
      if (cnt[i] > 0 && i !== prev) {
        cnt[i]--
        dfs(used + 1, i)
        cnt[i]++
      }
    }
  }
  dfs(0, -1)
  return ans
}

console.log(main('abc', 1))
