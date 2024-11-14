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
 * Complete the 'maximumSum' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY a
 *  2. LONG_INTEGER m
 */

function maximumSum(a: number[], m: number): number {
    let maxModSum = 0;
    let prefixSum = 0;
    const prefixArray: number[] = [];

    for (let i = 0; i < a.length; i++) {
        prefixSum = (prefixSum + a[i]) % m;

        // Update maxModSum with the current prefix sum modulo m
        maxModSum = Math.max(maxModSum, prefixSum);

        // Use binary search to find the smallest prefix greater than prefixSum
        const pos = binarySearch(prefixArray, prefixSum);

        // If a greater prefix exists, calculate max modulo result
        if (pos < prefixArray.length) {
            // Calculate the modulo of the subarray sum ending at the current position.
            // By subtracting the smallest prefix sum greater than the current prefixSum (prefixArray[pos]),
            // we get the sum of a subarray that maximizes the remainder when divided by m.
            // Adding m before taking % m handles cases where the result is negative,
            // ensuring the modulo operation yields a positive remainder.
            // Update maxModSum to keep track of the highest remainder seen so far.
            maxModSum = Math.max(maxModSum, (prefixSum - prefixArray[pos] + m) % m);
        }

        // Insert prefixSum into the correct position to maintain sorted order
        prefixArray.splice(pos, 0, prefixSum);
    }

    return maxModSum;
}

// Helper function for binary search to find the smallest element greater than the target
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] > target) right = mid;
        else left = mid + 1;
    }

    return left;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const n: number = parseInt(firstMultipleInput[0], 10);

        const m: number = parseInt(firstMultipleInput[1], 10);

        const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

        const result: number = maximumSum(a, m);

        ws.write(result + '\n');
    }

    ws.end();
}
