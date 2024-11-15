'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'connectedCell' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

// We can use DFS, BFS or IDDFS
// DFS first traverses nodes going through one adjacent of root, then next adjacent. The problem with this approach is, if there is a node close to root, but not in first few subtrees explored by DFS, then DFS reaches that node very late. Also, DFS may not find shortest path to a node (in terms of number of edges).
// DFS fits well here because of its efficiency for exploring all nodes of a region. We used dfs on a unvisited 1
// We explore this new region by using a stack of unvisited nodes. Each node can be a 1 or a 0. 
// If it's a 0 or if already visited, or is out of limits, then this node doesnt matter
// If it's a 1, we visit it, sum it and search for neighboring 1's in the region.

// BFS goes level by level, but requires more space. The space required by DFS is O(d) where d is depth of tree, but space required by BFS is O(n) where n is number of nodes in tree (Why? Note that the last level of tree can have around n/2 nodes and second last level n/4 nodes and in BFS we need to have every level one by one in queue).

// IDDFS combines depth-first searchs space-efficiency and breadth-first search’s fast search (for nodes closer to root). 
// IDDFS calls DFS for different depths starting from an initial value. In every call, DFS is restricted from going beyond given depth. So basically we do DFS in a BFS fashion. 

function connectedCell(matrix: number[][]): number {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0],  // Horizontal and vertical
        [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonal
    ];
    const regionSums: number[] = [];

    function dfs(r: number, c: number): number {
        let stack = [[r, c]];
        let regionSum = 0;

        while (stack.length > 0) {
            const [row, col] = stack.pop()!;
            if (row < 0 || row >= rows || col < 0 || col >= cols || visited[row][col] || matrix[row][col] === 0) {
                continue;
            }

            // Mark the cell as visited
            visited[row][col] = true;
            regionSum += matrix[row][col];

            // Explore all adjacent cells
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                stack.push([newRow, newCol]);
            }
        }

        return regionSum;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === 1 && !visited[r][c]) {
                // Start a new region search
                const regionSum = dfs(r, c);
                regionSums.push(regionSum);
            }
        }
    }
    
    return regionSums.reduce((max, curr) => max < curr ? curr: max, 0);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const m: number = parseInt(readLine().trim(), 10);

    let matrix: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    const result: number = connectedCell(matrix);

    ws.write(result + '\n');

    ws.end();
}
