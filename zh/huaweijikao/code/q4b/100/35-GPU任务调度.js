// 35 GPU任务调度
// GPU一次最多执行n个任务、一秒执行一次；每秒有新增任务，
// 保证GPU不空闲（只要还有任务就以满负荷执行），求最少耗时（秒）

function main(n, tasks) {
  let sec = 0
  let backlog = 0
  for (const t of tasks) {
    backlog += t
    const done = Math.min(n, backlog)
    backlog -= done
    sec++
  }
  if (backlog > 0) {
    sec += Math.ceil(backlog / n)
  }
  return sec
}

console.log(main(3, [1, 2, 3, 4, 5]))
