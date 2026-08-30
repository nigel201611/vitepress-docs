// 按身高和体重排队
function main(heights, weights) {
  let hiightArr = heights.split(' ')
  let weightArr = weights.split(' ')
  let playerList = []
  for (let i = 0; i < hiightArr.length; i++) {
    playerList.push({ idx: i + 1, height: parseInt(hiightArr[i]), weight: parseInt(weightArr[i]) })
  }
  playerList = playerList.sort((a, b) => {
    return a.height - b.height || a.weight - b.weight || a.idx - b.idx
  })
  return playerList
}

console.log(main('90 110 90', '45 60 45'))
