// 3 哈夫曼树：构建哈夫曼树(左权值<=右, 等权时左子树高度<=右子树)并输出中序遍历

function main(n, arr) {
  const heap = arr.map((w) => ({ w, h: 0, left: null, right: null }))
  const cmp = (a, b) => a.w - b.w || a.h - b.h
  const push = (x) => {
    heap.push(x)
    let i = heap.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (cmp(heap[i], heap[p]) < 0) {
        ;[heap[i], heap[p]] = [heap[p], heap[i]]
        i = p
      } else break
    }
  }
  const pop = () => {
    const top = heap[0]
    const last = heap.pop()
    if (heap.length) {
      heap[0] = last
      let i = 0
      for (;;) {
        const l = 2 * i + 1
        const r = 2 * i + 2
        let m = i
        if (l < heap.length && cmp(heap[l], heap[m]) < 0) m = l
        if (r < heap.length && cmp(heap[r], heap[m]) < 0) m = r
        if (m === i) break
        ;[heap[i], heap[m]] = [heap[m], heap[i]]
        i = m
      }
    }
    return top
  }
  while (heap.length > 1) {
    const a = pop()
    const b = pop()
    let left = a
    let right = b
    if (a.w === b.w && a.h > b.h) {
      left = b
      right = a
    }
    push({ w: a.w + b.w, h: Math.max(left.h, right.h) + 1, left, right })
  }
  const out = []
  const inorder = (node) => {
    if (!node) return
    inorder(node.left)
    out.push(node.w)
    inorder(node.right)
  }
  inorder(heap[0])
  return out.join(' ')
}

console.log(main(5, [5, 15, 40, 30, 10]))
