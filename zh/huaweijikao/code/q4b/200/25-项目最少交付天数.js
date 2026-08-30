// 第 25 题:项目最少交付天数
// 项目组共有 N 个开发人员,接到 M 个独立需求(工作量分别为 X1..Xm,单位天),
// 每个需求只能由一个开发人员独立完成、不能多人合作,需求之间无任何先后依赖,
// 求"最快完成所有工作"的最少天数,即把需求分成不超过 N 组,
// 使各组工作量之和的最大值最小(一组对应一个开发人员的全部工作量)。
// 二分答案 D,判断能否满足:需求按工作量降序,按顺序把每个需求塞给
// 当前工作量最少且仍装得下(D 内)的开发人员,若某个需求无处可放则失败。
// 可行性关于 D 单调,下界取 max(ceil(总和/N), 最大单个需求)。
function main(input, n) {
  const reqs = input.split(/\s+/).map(Number).sort((a, b) => b - a)
  const N = Number(n)
  const total = reqs.reduce((s, x) => s + x, 0)
  const can = (D) => {
    const load = new Array(N).fill(0)
    for (const r of reqs) {
      let idx = -1
      let best = Infinity
      for (let i = 0; i < N; i++) {
        if (load[i] + r <= D && load[i] < best) {
          best = load[i]
          idx = i
        }
      }
      if (idx === -1) return false
      load[idx] += r
    }
    return true
  }
  let lo = Math.max(Math.ceil(total / N), reqs[0])
  let hi = total
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (can(mid)) hi = mid
    else lo = mid + 1
  }
  return lo
}

console.log(main('6 2 7 7 9 3 2 1 3 11 4', 2))
