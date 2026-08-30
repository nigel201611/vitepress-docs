// 非严格递增连续数字序列长度
function main(input) {
  let cards = input.split('')
  let res = []
  for (let i = 0; i < cards.length; i++) {
    let tempCards = []
    tempCards.push(cards[i])
    let j = i + 1
    if (cards[i] <= '9' && cards[i] >= '0') {
      while (cards[j] - cards[j - 1] === 1 || cards[j] === cards[j - 1]) {
        tempCards.push(cards[j])
        j++
      }
      if (tempCards.length >= res.length) {
        res = [...tempCards]
      }
      i += j - 2
    }
  }

  return res.join()
}

console.log(main('abc2234019A334bc'))
