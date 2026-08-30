// 23 围棋气数

function main(blackLine, whiteLine) {
  const black = []
  const white = []
  for (let i = 0; i < blackLine.length; i += 2) black.push([blackLine[i], blackLine[i + 1]])
  for (let i = 0; i < whiteLine.length; i += 2) white.push([whiteLine[i], whiteLine[i + 1]])

  const blackSet = new Set(black.map(([r, c]) => r + ',' + c))
  const whiteSet = new Set(white.map(([r, c]) => r + ',' + c))

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  // 同色棋子重合的气点只计一次:统计该颜色所有棋子相邻的空交叉点去重数量
  function liberties(stones, ownSet, otherSet) {
    const libs = new Set()
    for (const [r, c] of stones) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr
        const nc = c + dc
        if (nr < 0 || nr > 18 || nc < 0 || nc > 18) continue
        const key = nr + ',' + nc
        if (ownSet.has(key) || otherSet.has(key)) continue
        libs.add(key)
      }
    }
    return libs.size
  }

  const blackLib = liberties(black, blackSet, whiteSet)
  const whiteLib = liberties(white, whiteSet, blackSet)
  return blackLib + ' ' + whiteLib
}

console.log(main([0, 5, 8, 9, 9, 10], [5, 0, 9, 9, 9, 8]))
