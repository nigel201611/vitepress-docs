// 51 员工出勤奖励: 判断每条出勤记录能否获得出勤奖
// 条件: 缺勤不超过一次; 没有连续的迟到/早退; 任意连续7次考勤，缺勤/迟到/早退不超过3次
// 输入: count 记录条数, records 每条记录的字符串(可能包含多个出勤词)

function canGetPrize(record) {
  const arr = record.trim().split(/\s+/).filter((s) => s.length > 0)
  let absent = 0
  for (const s of arr) {
    if (s === 'absent') absent++
  }
  if (absent > 1) return false
  const bad = new Set(['late', 'leaveearly'])
  for (let i = 0; i + 1 < arr.length; i++) {
    if (bad.has(arr[i]) && bad.has(arr[i + 1])) return false
  }
  for (let i = 0; i + 7 <= arr.length; i++) {
    let cnt = 0
    for (let j = i; j < i + 7; j++) {
      if (bad.has(arr[j]) || arr[j] === 'absent') cnt++
    }
    if (cnt > 3) return false
  }
  return true
}

function main(count, records) {
  const res = []
  for (let i = 0; i < count; i++) {
    res.push(canGetPrize(records[i]) ? 'true' : 'false')
  }
  return res.join(' ')
}

console.log(main(2, ['present', 'present present']))

// 输入描述中的示例: present absent present present leaveearly present absent
console.log(main(2, ['present', 'present absent present present leaveearly present absent']))
