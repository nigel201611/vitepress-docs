// We Are A Team

function main(count, nums) {
  let lists = []
  let waitForVerify = []
  let res = []
  for (i = 0; i < nums.length; i++) {
    let rels = nums[i]
    let i1 = rels[0]
    let i2 = rels[1]
    let i3 = rels[2]
    if (i3 != 0) {
      waitForVerify.push([...rels])
    } else {
      let flag = false
      for (let j = 0; j < lists.length; j++) {
        let set = lists[j]
        if (set.has(i1) || set.has(i2)) {
          set.add(i1)
          set.add(i2)
          flag = true
          break
        }
      }
      if (!flag) {
        let set = new Set()
        set.add(i1)
        set.add(i2)
        lists.push(set)
      }
    }
  }

  //判断非0的关系
  for (let i = 0; i < waitForVerify.length; i++) {
    let rels = waitForVerify[i]
    let i1 = rels[0]
    let i2 = rels[1]
    let i3 = rels[2]
    if (i3 != 1) {
      res.push('da pian zi')
      continue
    }
    for (let j = 0; j < lists.length; j++) {
      let set = lists[j]
      if (set.has(i1) && set.has(i2)) {
        res.push('we are a team')
      } else {
        res.push('we are not a team')
      }
    }
  }
  return res.join('\n')
}

console.log(
  main(5, [
    [1, 2, 0],
    [1, 2, 1],
    [1, 5, 0],
    [2, 3, 1],
    [2, 5, 1],
    [1, 3, 2]
  ])
)
