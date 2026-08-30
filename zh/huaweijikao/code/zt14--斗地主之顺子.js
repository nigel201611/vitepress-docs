// 斗地主之顺子 3,4,5,6,7,8,9,10,J,Q,K,A
function main(input) {
  const cardsMap = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }
  let cards = input.split(' ')
  cards.sort((a, b) => cardsMap[a] - cardsMap[b])
  let res = []
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] === '2') {
      continue
    }
    let tempCards = []
    tempCards.push(cards[i])
    let j = i + 1
    while (cardsMap[cards[j]] - cardsMap[cards[i]] === j - i) {
      tempCards.push(cards[j])
      j++
    }
    if (tempCards.length >= 5) {
      res.push([...tempCards])
    }
    i += j - 2
  }

  if (res.length <= 0) {
    return 'No'
  }

  return res.join('\n')
}

console.log(main('2 9 9 9 3 4 K A 10 Q A 5 6'))
