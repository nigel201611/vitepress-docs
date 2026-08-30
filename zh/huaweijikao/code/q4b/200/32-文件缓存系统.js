// 第 32 题:文件缓存系统(LFU + LRU)
// 缓存上限为 m 字节,支持两种操作:
//   put file_name file_size: 若该文件名已存在则忽略(规则1);
//     否则当空间不足时,按"访问次数从少到多、时间从老到新"的顺序循环删除文件,
//     直到剩余空间满足新文件大小为止;若清空后仍装不下则放弃存放(规则6)。
//   get file_name: 文件存在则总访问次数加1、最近访问时间更新到最新;不存在则不作任何操作。
// 注意:新文件首次存入时总访问次数不变(为0),最近访问时间更新到最新(规则2/3);
// 时间戳全局单调递增,保证任何两个文件的最近访问时间不重复(规则4)。
// 输出:按文件名字典序、英文逗号分隔的缓存文件列表,无文件则输出 NONE。
function main(m, ops) {
  const maxBytes = m
  const files = new Map() // name -> { size, count, time }
  let used = 0
  let clock = 0
  for (const op of ops) {
    const [cmd, name, sizeStr] = op.trim().split(/\s+/)
    if (cmd === 'put') {
      const size = Number(sizeStr)
      if (files.has(name)) continue // 规则1:同名不放入
      while (used + size > maxBytes && files.size > 0) {
        // 淘汰:访问次数少者优先,次数相同则时间老者优先
        let victim = null
        for (const [n, f] of files) {
          if (!victim || f.count < victim.f.count || (f.count === victim.f.count && f.time < victim.f.time)) {
            victim = { n, f }
          }
        }
        used -= victim.f.size
        files.delete(victim.n)
      }
      if (used + size > maxBytes) continue // 规则6:清空缓存也装不下,放弃
      clock++
      files.set(name, { size, count: 0, time: clock })
      used += size
    } else {
      const f = files.get(name)
      if (!f) continue // 文件不存在,不作任何操作
      clock++
      f.count++
      f.time = clock
    }
  }
  if (files.size === 0) return 'NONE'
  return [...files.keys()].sort().join(',')
}

console.log(main(50, ['put a 10', 'put b 20', 'get a', 'get a', 'get b', 'put c 30']))
