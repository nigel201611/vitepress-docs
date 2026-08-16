// 根据 百度百科 ， 生命游戏 ，简称为 生命 ，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。

// 给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： 1 即为 活细胞 （live），或 0 即为 死细胞 （dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：

// 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
// 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
// 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
// 如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
// 下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是同时发生的。给你 m x n 网格面板 board 的当前状态，返回下一个状态。

// 示例 1：

// 输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
// 输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
	let neighbors = [0, 1, -1]

	let rows = board.length
	let cols = board[0].length

	// 创建复制数组 copyBoard
	let copyBoard = new Array(rows).fill(false).map(() => new Array(cols).fill(false))

	// 从原数组复制一份到 copyBoard 中
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			copyBoard[row][col] = board[row][col]
		}
	}

	// 遍历面板每一个格子里的细胞
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			// 对于每一个细胞统计其八个相邻位置里的活细胞数量
			let liveNeighbors = 0

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (!(neighbors[i] == 0 && neighbors[j] == 0)) {
						let r = row + neighbors[i]
						let c = col + neighbors[j]

						// 查看相邻的细胞是否是活细胞
						if (r < rows && r >= 0 && c < cols && c >= 0 && copyBoard[r][c] == 1) {
							liveNeighbors += 1
						}
					}
				}
			}

			// 规则 1 或规则 3
			if (copyBoard[row][col] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
				board[row][col] = 0
			}
			// 规则 4
			if (copyBoard[row][col] == 0 && liveNeighbors == 3) {
				board[row][col] = 1
			}
		}
	}
}

// 方法二：使用额外的状态

// 思路

// 方法一中 O(mn) 的空间复杂度在数组很大的时候内存消耗是非常昂贵的。
// 题目中每个细胞只有两种状态 live(1) 或 dead(0)，但我们可以拓展一些复合状态使其包含之前的状态。
// 举个例子，如果细胞之前的状态是 0，但是在更新之后变成了 1，我们就可以给它定义一个复合状态 2。这样我们看到 2，
// 既能知道目前这个细胞是活的，还能知道它之前是死的。

var gameOfLife = function (board) {
	let neighbors = [0, 1, -1]

	let rows = board.length
	let cols = board[0].length

	// 遍历面板每一个格子里的细胞
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			// 对于每一个细胞统计其八个相邻位置里的活细胞数量
			let liveNeighbors = 0

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (!(neighbors[i] == 0 && neighbors[j] == 0)) {
						// 相邻位置的坐标
						let r = row + neighbors[i]
						let c = col + neighbors[j]

						// 查看相邻的细胞是否是活细胞
						if (r < rows && r >= 0 && c < cols && c >= 0 && Math.abs(board[r][c]) == 1) {
							liveNeighbors += 1
						}
					}
				}
			}

			// 规则 1 或规则 3
			if (board[row][col] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
				// -1 代表这个细胞过去是活的现在死了
				board[row][col] = -1
			}
			// 规则 4
			if (board[row][col] == 0 && liveNeighbors == 3) {
				// 2 代表这个细胞过去是死的现在活了
				board[row][col] = 2
			}
		}
	}

	// 遍历 board 得到一次更新后的状态
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (board[row][col] > 0) {
				board[row][col] = 1
			} else {
				board[row][col] = 0
			}
		}
	}
}
