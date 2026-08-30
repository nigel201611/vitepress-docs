// 最长元音子串:开头结尾均为元音,内部非元音字符数等于瑕疵度flaw,求最长长度
function main(flaw, s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
  const V = []
  for (let i = 0; i < s.length; i++) if (vowels.has(s[i])) V.push(i)
  if (V.length === 0) return 0
  const pref = new Array(s.length + 1).fill(0)
  for (let i = 0; i < s.length; i++) {
    pref[i + 1] = pref[i] + (vowels.has(s[i]) ? 0 : 1)
  }
  let l = 0
  let ans = 0
  for (let r = 0; r < V.length; r++) {
    while (pref[V[r]] - pref[V[l] + 1] > flaw) l++
    const cnt = pref[V[r]] - pref[V[l] + 1]
    if (cnt === flaw) ans = Math.max(ans, V[r] - V[l] + 1)
  }
  return ans
}

console.log(main(0, 'asdbuiodevauufgh'))
