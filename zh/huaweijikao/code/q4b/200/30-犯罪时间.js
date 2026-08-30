// 第 30 题:犯罪时间
// 线人给出的时间形如 "HH:MM"(已修改过),解密规则:利用当前出现过的数字
// (可以无限次使用),构造下一个"距离当前时间最近"的合法时刻,即为犯罪时间。
// 可能的最近时刻在第二天(即从输入时刻之后 1 分钟开始,按分钟递增寻找,
// 一天最多 1440 个时刻,跨天一律转回 0 起算)。
function main(input) {
  const digits = new Set(input.replace(':', '').split(''))
  const [h, m] = input.split(':').map(Number)
  const start = h * 60 + m
  const build = (t) => {
    const hh = String(Math.floor(t / 60)).padStart(2, '0')
    const mm = String(t % 60).padStart(2, '0')
    return hh + ':' + mm
  }
  for (let k = 1; k <= 1440; k++) {
    const t = (start + k) % 1440
    const s = build(t)
    let ok = true
    for (const c of s.replace(':', '')) {
      if (!digits.has(c)) {
        ok = false
        break
      }
    }
    if (ok) return s
  }
  return input
}

console.log(main('18:52'))
