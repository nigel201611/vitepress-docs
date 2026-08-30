// 33 手机App时间管理
// 规则：
// 1. 一天24小时内，一个时间段只能注册一个App
// 2. 注册新时段时，若与已注册时段冲突：
//    - 存在同级或更高优先级App → 新App注册不上
//    - 冲突的App优先级都更低 → 注销所有冲突App，注册新App
// 3. 时间段包含起始时间点，不包含结束时间点

function toMin(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function main(n, regs, query) {
  const accepted = []
  for (let i = 0; i < n; i++) {
    const [name, prStr, startStr, endStr] = regs[i].trim().split(/\s+/)
    const pr = Number(prStr)
    const s = toMin(startStr)
    const e = toMin(endStr)
    // 找出与之冲突（时间段有交集）的已注册App
    const conflicts = accepted.filter(a => s < a.end && e > a.start)
    if (conflicts.some(a => a.pr >= pr)) {
      // 存在同级或更高优先级的冲突，该App不能注册
      continue
    }
    // 注销所有低优先级冲突App，并注册当前App
    for (const c of conflicts) {
      const idx = accepted.indexOf(c)
      accepted.splice(idx, 1)
    }
    accepted.push({ name, pr, start: s, end: e })
  }
  const q = toMin(query)
  const hit = accepted.find(a => q >= a.start && q < a.end)
  return hit ? hit.name : 'NA'
}

console.log(main(1, ['App1 1 09:00 10:00'], '09:30'))
