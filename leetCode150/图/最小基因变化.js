// 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。
// 一次基因变化表示基因序列中的一个字符发生了变化。基因变化需要满足：变化后的基因序列必须在基因库 bank 中。
// 给你起始基因 startGene 和目标基因 endGene ，以及一个基因库 bank ，请你找出并返回能够使起始基因序列变化为目标基因序列所需的最少变化次数。
// 如果无法完成此变化，请返回 -1 。

// 思路：BFS 求最少变化次数
// 每次变化把某个位置替换成 A/C/G/T 中的一个，且结果必须在 bank 中。
// BFS 层层扩展，首次遇到 endGene 的层数就是最少变化次数。
// 用 visited 集合防止重复扩展。

var minMutation = function (startGene, endGene, bank) {
  const bankSet = new Set(bank)
  if (!bankSet.has(endGene)) return -1

  const genes = ['A', 'C', 'G', 'T']
  const visited = new Set([startGene])
  let queue = [startGene]
  let steps = 0

  while (queue.length) {
    const nextQueue = []
    for (const gene of queue) {
      if (gene === endGene) return steps
      for (let i = 0; i < 8; i++) {
        for (const g of genes) {
          if (gene[i] === g) continue
          const mutated = gene.slice(0, i) + g + gene.slice(i + 1)
          if (bankSet.has(mutated) && !visited.has(mutated)) {
            visited.add(mutated)
            nextQueue.push(mutated)
          }
        }
      }
    }
    queue = nextQueue
    steps++
  }
  return -1
}

console.log(minMutation('AACCGGTT', 'AACCGGTA', ['AACCGGTA'])) // 1
console.log(minMutation('AACCGGTT', 'AAACGGTA', ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'])) // 2
