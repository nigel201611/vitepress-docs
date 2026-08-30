// 比赛评分
function main(input, scores) {
  let num = input.split(',')
  let ma = parseInt(num[0]) //教练
  let no = parseInt(num[1]) //选手
  if (ma > 10 || ma < 3 || no > 100 || no < 3) {
    return -1
  }

  //收集选手信息
  let players = []
  for (let i = 0; i < no; i++) {
    //第i个选手
    let total = 0
    let listScore = []
    for (let j = 0; j < ma; j++) {
      //第j个裁判
      let strings = scores[j]
      let score = parseInt(strings[i])
      if (score < 0 || score > 10) {
        return -1
      }
      listScore.push(score)
      total += score
    }
    players.push({ idx: i, total, listScore })
  }
  console.log(players)
  //比较选手分数
  players.sort(compareTo)
  console.log(players)
  let res = ''
  for (let i = 0; i < 3; i++) {
    res += i === 2 ? players[i].idx + 1 : players[i].idx + 1 + ','
  }
  return res
}
function checkCount(list, count) {
  let cou = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i] == count) {
      cou++
    }
  }
  return cou
}
function compareTo(a, b) {
  //先比较总分
  if (a.total < b.total) {
    return 1
  } else if (a.total > b.total) {
    return -1
  } else {
    //后比较最高分的数量
    let ascPly = a.listScore
    let bscPly = b.listScore
    for (let i = 10; i > 0; i--) {
      let aipl = checkCount(ascPly, i)
      let bipl = checkCount(bscPly, i)
      if (aipl < bipl) {
        return -1
      }
    }
  }
  return 0
}

console.log(
  main('4,5', [
    [10, 6, 9, 7, 6],
    [9, 10, 6, 7, 5],
    [8, 10, 6, 5, 10],
    [9, 10, 8, 4, 9]
  ])
)
